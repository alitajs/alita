/**
    Licensed to the Apache Software Foundation (ASF) under one
    or more contributor license agreements.  See the NOTICE file
    distributed with this work for additional information
    regarding copyright ownership.  The ASF licenses this file
    to you under the Apache License, Version 2.0 (the
    "License"); you may not use this file except in compliance
    with the License.  You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing,
    software distributed under the License is distributed on an
    "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, either express or implied.  See the License for the
    specific language governing permissions and limitations
    under the License.
*/
// copy form cordova-create
import fs from 'fs-extra';
import path from 'path';
import tmp from 'tmp';
import isUrl from 'is-url';
import isObject from 'isobject';
import pathIsInside from 'path-is-inside';
import requireFresh from 'import-fresh';
import validateIdentifier from 'valid-identifier';
import fetch from 'cordova-fetch';
import {events as CEvents,CordovaError,ConfigParser,CordovaLogger as CLog} from 'cordova-common';

const CordovaLogger = CLog.get();
const DEFAULT_VERSION = '1.0.0';
let events = CEvents;
/**
 * Sets up to forward events to another instance, or log console.
 * This will make the create internal events visible outside
 * @param  {EventEmitter} externalEventEmitter An EventEmitter instance that will be used for
 *   logging purposes. If no EventEmitter provided, all events will be logged to console
 * @return {EventEmitter}
 */
function setupEvents (externalEventEmitter) {
    if (externalEventEmitter) {
        // This will make the platform internal events visible outside
        events.forwardEventsTo(externalEventEmitter);
    // There is no logger if external emitter is not present,
    // so attach a console logger
    } else {
        CordovaLogger.subscribe(events);
    }
    return events;
}

export default cordovaCreateLegacyAdapter;

/**
* Legacy interface. See README for documentation
*/
function cordovaCreateLegacyAdapter (dir, id, name, cfg, extEvents) {
    // Unwrap and shallow-clone that nasty nested config object
    const opts = Object.assign({}, ((cfg || {}).lib || {}).www);

    if (id) opts.id = id;
    if (name) opts.name = name;
    if (extEvents) opts.extEvents = extEvents;

    return cordovaCreate(dir, opts);
}

/**
 * Creates a new cordova project in the given directory.
 *
 * @param {string} dest         directory where the project will be created.
 * @param {Object} [opts={}]    options to be used for creating the project.
 * @returns {Promise}           Resolves when project creation has finished.
 */
function cordovaCreate (dest, opts = {} as any) {
    // TODO this is to avoid having a huge diff. Remove later.
    let dir = dest;

    return Promise.resolve().then(function () {
        if (!dir) {
            throw new CordovaError('Directory not specified. See `cordova help`.');
        }

        if (!isObject(opts)) {
            throw new CordovaError('Given options must be an object');
        }

        // Shallow copy opts
        opts = Object.assign({}, opts);

        events = setupEvents(opts.extEvents);
        events.emit('verbose', 'Using detached cordova-create');

        // Make absolute.
        dir = path.resolve(dir);

        // if (fs.existsSync(dir) && fs.readdirSync(dir).length > 0) {
        //     throw new CordovaError('Path already exists and is not empty: ' + dir);
        // }

        if (opts.id && !validateIdentifier(opts.id)) {
            throw new CordovaError('App id contains a reserved word, or is not a valid identifier.');
        }

        // This was changed from "uri" to "url", but checking uri for backwards compatibility.
        opts.url = opts.url || opts.uri;

        if (!opts.url) {
            opts.url = require.resolve('cordova-app-hello-world');
            opts.template = true;
        }

        // Ensure that the destination is outside the template location
        if (pathIsInside(dir, opts.url)) {
            throw new CordovaError(
                `Cannot create project "${dir}" inside the template used to create it "${opts.url}".`
            );
        }
    })
        .then(function () {
            // Finally, Ready to start!
            events.emit('log', 'Creating a new cordova project.');

            // If symlink, don't fetch
            if (opts.link) {
                return opts.url;
            }

            // Use cordova-fetch to obtain npm or git templates
            if (opts.template && isRemoteUri(opts.url)) {
                const target = opts.url;
                events.emit('verbose', 'Using cordova-fetch for ' + target);
                return fetch(target, getSelfDestructingTempDir(), {});
            } else {
                // If assets are not online, resolve as a relative path on local computer
                return path.resolve(opts.url);
            }
        })
        .then(function (input_directory) {
            let import_from_path = input_directory;

            // handle when input wants to specify sub-directory (specified in index.js as "dirname" export);
            let isSubDir = false;
            try {
                const templatePkg = requireFresh(input_directory);
                if (templatePkg && templatePkg.dirname) {
                    import_from_path = templatePkg.dirname;
                    isSubDir = true;
                }
            } catch (e) {
                events.emit('verbose', 'index.js does not specify valid sub-directory: ' + input_directory);
                isSubDir = false;
            }

            if (!fs.existsSync(import_from_path)) {
                throw new CordovaError('Could not find directory: ' +
                    import_from_path);
            }

            const dirAlreadyExisted = fs.existsSync(dir);
            if (!dirAlreadyExisted) {
                fs.mkdirSync(dir);
            }

            try {
                // Copy files from template to project
                // if (opts.template) {
                //     events.emit('verbose', 'Copying assets.');
                //     copyTemplateFiles(import_from_path, dir, isSubDir);
                // }

                // If --link, link merges, hooks, www, and config.xml (and/or copy to root)
                if (opts.link) {
                    events.emit('verbose', 'Symlinking assets.');
                    linkFromTemplate(import_from_path, dir);
                }

                // If following were not copied/linked from template, copy from stock app hello world
                // TODO: get stock package.json if template does not contain package.json;
                copyIfNotExists(stockAssetPath('www'), path.join(dir, 'www'));
                copyIfNotExists(stockAssetPath('hooks'), path.join(dir, 'hooks'));
                const configXmlExists = projectConfig(dir); // moves config to root if in www
                if (!configXmlExists) {
                    fs.copySync(stockAssetPath('config.xml'), path.join(dir, 'config.xml'));
                }
            } catch (e) {
                if (!dirAlreadyExisted) {
                    fs.removeSync(dir);
                }
                if (process.platform.slice(0, 3) === 'win' && e.code === 'EPERM') {
                    throw new CordovaError('Symlinks on Windows require Administrator privileges');
                }
                throw e;
            }

            // const pkgjsonPath = path.join(dir, 'package.json');
            // // Update package.json name and version fields
            // if (fs.existsSync(pkgjsonPath)) {
            //     const pkgjson = requireFresh(pkgjsonPath);

            //     // Pkjson.displayName should equal config's name.
            //     if (opts.name) {
            //         pkgjson.displayName = opts.name;
            //     }
            //     // Pkjson.name should equal config's id.
            //     if (opts.id) {
            //         pkgjson.name = opts.id.toLowerCase();
            //     } else {
            //         // Use default name.
            //         pkgjson.name = 'helloworld';
            //     }

            //     pkgjson.version = DEFAULT_VERSION;
            //     fs.writeFileSync(pkgjsonPath, JSON.stringify(pkgjson, null, 4), 'utf8');
            // }

            // Create basic project structure.
            fs.ensureDirSync(path.join(dir, 'platforms'));
            fs.ensureDirSync(path.join(dir, 'plugins'));

            const configPath = path.join(dir, 'config.xml');
            // only update config.xml if not a symlink
            if (!fs.lstatSync(configPath).isSymbolicLink()) {
                // Write out id, name and default version to config.xml
                const conf = new ConfigParser(configPath);
                if (opts.id) conf.setPackageName(opts.id);
                if (opts.name) conf.setName(opts.name);
                conf.setVersion(DEFAULT_VERSION);
                conf.write();
            }
        });
}

/**
 * Recursively copies folder to destination if folder is not found in destination (including symlinks).
 * @param  {string} src for copying
 * @param  {string} dst for copying
 * @return No return value
 */
function copyIfNotExists (src, dst) {
    if (!fs.existsSync(dst) && src) {
        fs.copySync(src, dst);
    }
}

/**
 * Copies template files, and directories into a Cordova project directory.
 * If the template is a www folder, the www folder is simply copied
 * Otherwise if the template exists in a subdirectory everything is copied
 * Otherwise package.json, RELEASENOTES.md, .git, NOTICE, LICENSE, COPYRIGHT, and .npmignore are not copied over.
 * A template directory, and project directory must be passed.
 * templateDir - Template directory
 * projectDir - Project directory
 * isSubDir - boolean is true if template has subdirectory structure (see code around line 229)
 */
function copyTemplateFiles (templateDir, projectDir, isSubDir) {
    let copyPath = '';
    // if template is a www dir
    if (path.basename(templateDir) === 'www') {
        copyPath = path.resolve(templateDir);
        fs.copySync(copyPath, path.resolve(projectDir, 'www'));
    } else {
        let templateFiles = fs.readdirSync(templateDir);
        // Remove directories, and files that are unwanted
        if (!isSubDir) {
            const excludes = ['package.json', 'RELEASENOTES.md', '.git', 'NOTICE', 'LICENSE', 'COPYRIGHT', '.npmignore'];
            templateFiles = templateFiles.filter(function (value) {
                return excludes.indexOf(value) < 0;
            });
        }
        // Copy each template file after filter
        templateFiles.forEach(f => {
            copyPath = path.resolve(templateDir, f);
            fs.copySync(copyPath, path.resolve(projectDir, f));
        });
    }
}

/**
 * Find config file in project directory or www directory
 * If file is in www directory, move it outside
 * @param  {String} project directory to be searched
 * @return {String or False} location of config file; if none exists, returns false
 */
function projectConfig (projectDir) {
    const rootPath = path.join(projectDir, 'config.xml');
    const wwwPath = path.join(projectDir, 'www', 'config.xml');
    if (fs.existsSync(rootPath)) {
        return rootPath;
    } else if (fs.existsSync(wwwPath)) {
        fs.renameSync(wwwPath, rootPath);
        return wwwPath;
    }
    return false;
}

/**
 * Removes existing files and symlinks them if they exist.
 * Symlinks folders: www, merges, hooks
 * Symlinks file: config.xml (but only if it exists outside of the www folder)
 * If config.xml exists inside of template/www, COPY (not link) it to project/
 * */
function linkFromTemplate (templateDir, projectDir) {
    let linkSrc, linkDst, linkFolders, copySrc, copyDst;
    function rmlinkSync (src, dst, type) {
        if (src && dst) {
            fs.removeSync(dst);
            if (fs.existsSync(src)) {
                fs.symlinkSync(src, dst, type);
            }
        }
    }
    // if template is a www dir
    if (path.basename(templateDir) === 'www') {
        linkSrc = path.resolve(templateDir);
        linkDst = path.join(projectDir, 'www');
        rmlinkSync(linkSrc, linkDst, 'dir');
        copySrc = path.join(templateDir, 'config.xml');
    } else {
        linkFolders = ['www', 'merges', 'hooks'];
        // Link each folder
        for (let i = 0; i < linkFolders.length; i++) {
            linkSrc = path.join(templateDir, linkFolders[i]);
            linkDst = path.join(projectDir, linkFolders[i]);
            rmlinkSync(linkSrc, linkDst, 'dir');
        }
        linkSrc = path.join(templateDir, 'config.xml');
        linkDst = path.join(projectDir, 'config.xml');
        rmlinkSync(linkSrc, linkDst, 'file');
        copySrc = path.join(templateDir, 'www', 'config.xml');
    }
    // if template/www/config.xml then copy to project/config.xml
    copyDst = path.join(projectDir, 'config.xml');
    if (!fs.existsSync(copyDst) && fs.existsSync(copySrc)) {
        fs.copySync(copySrc, copyDst);
    }
}

function stockAssetPath (p) {
    return path.join(require('cordova-app-hello-world').dirname, p);
}

// Creates temp dir that is deleted on process exit
function getSelfDestructingTempDir () {
    return tmp.dirSync({
        prefix: 'cordova-create-',
        unsafeCleanup: true
    }).name;
}

function isRemoteUri (uri) {
    return isUrl(uri) || uri.includes('@') || !fs.existsSync(uri);
}
