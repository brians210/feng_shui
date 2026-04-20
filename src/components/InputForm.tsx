import React from 'react';
import { Form, DatePicker, TimePicker, Select, Radio, Button } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

const { Option } = Select;

export interface BirthData {
  date: Dayjs | null;
  time: Dayjs | null;
  gender: 'male' | 'female';
  timezone: string;
}

interface InputFormProps {
  onCalculate: (data: BirthData) => void;
}

const InputForm: React.FC<InputFormProps> = ({ onCalculate }) => {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    onCalculate({
      date: values.date,
      time: values.time,
      gender: values.gender,
      timezone: values.timezone,
    });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={{
        gender: 'male',
        timezone: 'Asia/Hong_Kong',
        date: dayjs('1990-10-02'),
        time: dayjs('1990-10-02 11:00'),
      }}
    >
      <Form.Item
        label="Birth Date 出生日期"
        name="date"
        rules={[{ required: true, message: 'Please select your birth date' }]}
      >
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        label="Birth Time 出生時間"
        name="time"
        rules={[{ required: true, message: 'Please select your birth time' }]}
      >
        <TimePicker format="HH:mm" style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label="Gender 性別" name="gender">
        <Radio.Group>
          <Radio value="male">Male 男</Radio>
          <Radio value="female">Female 女</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item label="Timezone 時區" name="timezone">
        <Select>
          <Option value="Asia/Hong_Kong">UTC+8 (Hong Kong, Taiwan)</Option>
          <Option value="Asia/Shanghai">UTC+8 (China)</Option>
          <Option value="Asia/Tokyo">UTC+9 (Japan)</Option>
          <Option value="Asia/Seoul">UTC+9 (Korea)</Option>
          <Option value="Asia/Singapore">UTC+8 (Singapore)</Option>
          <Option value="America/New_York">UTC-5 (US Eastern)</Option>
          <Option value="America/Los_Angeles">UTC-8 (US Pacific)</Option>
          <Option value="Europe/London">UTC+0 (London)</Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Calculate 計算
        </Button>
      </Form.Item>
    </Form>
  );
};

export default InputForm;
