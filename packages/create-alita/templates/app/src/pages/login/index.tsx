import { Content, Header, Page } from '@alita/flow';
import { history, Link, setPageNavBar, useLocation } from 'alita';
import {
  Button,
  Divider,
  Form,
  Input,
  NavBar,
  Popup,
  Space,
  Toast,
} from 'antd-mobile';
import { EyeFill, EyeInvisibleOutline } from 'antd-mobile-icons';
import { parse } from 'querystring';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { login } from './service';

const LoginPage: FC = () => {
  const { pathname, search } = useLocation();
  const [visible, setVisible] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [eyeFill, setEyeFill] = useState(false);
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  useEffect(() => {
    setPageNavBar({
      pagePath: pathname,
      navBar: {
        hideNavBar: true,
      },
    });
  }, []);
  const right = (
    <div>
      <Space style={{ '--gap': '16px' }}>
        <Link to="/help" style={{ fontSize: '0.24rem', color: '#000' }}>
          帮助
        </Link>
      </Space>
    </div>
  );
  const handleSubmit = async (values: API.LoginParams) => {
    try {
      // 登录
      const msg = await login({ ...values });
      setIsLogin(false);
      if (msg.success) {
        Toast.show({
          content: '登录成功',
          duration: 1000,
        });
        /** 此方法会跳转到 redirect 参数所在的位置 */
        if (!history) return;
        const query = parse(search);
        const { redirect } = query as { redirect: string };
        history.push(redirect || '/');
        return;
      }
      Toast.show({
        content: '登录失败，请重试',
        duration: 1000,
      });
    } catch (error) {
      setIsLogin(false);
      Toast.show({
        content: '登录失败，请重试',
        duration: 1000,
      });
    }
  };
  const back = () => {
    if (step !== 1) {
      setStep(1);
    }
  };

  const mockContent = (
    <div
      style={{
        height: visible ? '60vh' : 'auto',
        paddingBottom: '0.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Form
        layout="horizontal"
        mode="card"
        footer={
          <Button
            block
            color="primary"
            size="large"
            loading={isLogin}
            onClick={async () => {
              // TODO:按规则这里应该要校验手机号码正确性
              if (username && step === 1) {
                setStep(2);
              }
              // TODO:按规则这里应该要校验密码的强度
              if (password && step === 2) {
                setIsLogin(true);
                handleSubmit({ username, password });
              }
            }}
          >
            {step === 1 ? '下一步' : '登录'}
          </Button>
        }
      >
        <Form.Item label="账号" hidden={step !== 1}>
          <Input
            placeholder="mobile"
            clearable
            value={username}
            onChange={setUsername}
            onFocus={() => {
              if (!visible) {
                setVisible(true);
              }
            }}
          />
        </Form.Item>
        <Form.Item
          extra={
            <Space>
              {eyeFill && <EyeFill onClick={() => setEyeFill(false)} />}
              {!eyeFill && (
                <EyeInvisibleOutline onClick={() => setEyeFill(true)} />
              )}
              <span
                style={{
                  border: '1px solid gray',
                  height: '16px',
                  verticalAlign: 'bottom',
                }}
              ></span>
              <Link to="">忘记密码</Link>
            </Space>
          }
          hidden={step === 1}
        >
          <Input
            placeholder="xiaohuoni"
            type={eyeFill ? 'text' : 'password'}
            clearable
            value={password}
            onChange={setPassword}
            onFocus={() => {
              if (!visible) {
                setVisible(true);
              }
            }}
          />
        </Form.Item>
      </Form>
      <Space>
        <Link to="">注册账号</Link>
        <Divider direction="vertical" />
        <Link to="">找回账号</Link>
      </Space>
    </div>
  );
  return (
    <Page>
      <Header>
        <NavBar right={right} onBack={back} backArrow={step === 2} />
      </Header>
      <Content>
        <div
          style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontWeight: 900, fontSize: '0.45rem' }}>
              便携生活 一点就好
            </p>
            <p
              style={{
                fontSize: '0.24rem',
              }}
            >
              你好，欢迎使用支付宝
            </p>
          </div>
          {!visible && mockContent}
        </div>
        <Popup
          visible={visible}
          onMaskClick={() => {
            setVisible(false);
          }}
          bodyStyle={{
            borderTopLeftRadius: '8px',
            borderTopRightRadius: '8px',
            minHeight: '60vh',
          }}
        >
          {mockContent}
        </Popup>
      </Content>
    </Page>
  );
};

export default LoginPage;
