import DynamicForm, {
  DformDatePicker,
  DformInput,
  DformPicker,
  DformRadio,
  MultiplePicker,
  Store,
  useForm,
  ValidateErrorEntity,
} from '@alitajs/dform';
import IFrame from '@alitajs/iframe';
import { history } from 'alita';
import { Button as AButton } from 'antd';
import { Button, WhiteSpace } from 'antd-mobile';
import { Button as Button5 } from 'antd-mobile-5';
import { FC, useEffect, useState } from 'react';

const sexData = [
  { label: '男', value: 'man' },
  { label: '女', value: 'woman' },
];
const weatherData = [
  { label: '晴', value: '晴' },
  { label: '阴', value: '阴' },
  { label: '雨', value: '雨' },
];

const motionData = [
  { label: '篮球', value: '篮球' },
  { label: '羽毛球', value: '羽毛球' },
  { label: '乒乓球', value: '乒乓球' },
];

// const ageData = Array.from

const UserName: FC = (props) => {
  const { result = {} } = props;
  const [form] = useForm();
  const [formsValues, setFormsValues] = useState<any>({});

  useEffect(() => {
    setFormsValues({
      sex: 'man',
      motion: ['羽毛球', '乒乓球'],
    });
  }, []);

  const onFinish = (values: Store) => {
    console.log(values);
  };
  const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
    console.log('Failed:', errorInfo);
  };

  const formProps = {
    form,
    onFinish,
    onFinishFailed,
    formsValues,
  };

  return (
    <div>
      <div>getInitialProps Data: {JSON.stringify(result)}</div>
      <IFrame height={'150px'} src="http://www.baidu.com"></IFrame>
      <DynamicForm {...formProps}>
        <DformInput
          fieldProps="username"
          required
          placeholder="请输入"
          title="用户名"
          defaultValue="小红"
        />
        <DformRadio fieldProps="sex" title="性别" data={sexData} />
        <DformDatePicker
          fieldProps="date"
          placeholder="请选择"
          title="出生年月"
        />
        <DformPicker
          fieldProps="weather"
          placeholder="请选择"
          title="天气"
          data={weatherData}
        />
        <MultiplePicker
          fieldProps="motion"
          placeholder="请选择"
          title="特长"
          data={motionData}
        />
      </DynamicForm>
      <WhiteSpace />
      <AButton onClick={() => form.submit()}>Antd Button</AButton>
      <Button
        type="primary"
        onClick={() => {
          history.push({
            pathname: '/settings',
            query: {
              x1: 1,
            },
          });
        }}
      >
        Antd Mobile@2 Button
      </Button>
      <Button5 block color="primary" size="large">
        Antd Mobile@5 Button
      </Button5>
    </div>
  );
};

UserName.getInitialProps = async (props) => {
  return {
    result: { title: 'alita' },
  };
};

export default UserName;
