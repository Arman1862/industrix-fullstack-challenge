import { useEffect } from 'react';
import { 
  Modal, 
  Form, 
  Input, 
  Select, 
  DatePicker, 
  Space, 
  Radio
} from 'antd';
import { useTodo } from '../context/TodoContext';
import dayjs from 'dayjs';

const { TextArea } = Input;

const TodoForm = ({ open, onCancel, todoToEdit = null }) => {
  const [form] = Form.useForm();
  const { categories, addTodo, updateTodo } = useTodo();

  useEffect(() => {
    if (todoToEdit) {
      form.setFieldsValue({
        ...todoToEdit,
        dueDate: todoToEdit.dueDate ? dayjs(todoToEdit.dueDate) : null
      });
    } else {
      form.resetFields();
    }
  }, [todoToEdit, form, open]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const dataToSubmit = {
        ...values,
        dueDate: values.dueDate ? values.dueDate.toISOString() : null
      };
      
      if (todoToEdit) {
        await updateTodo(todoToEdit.id, dataToSubmit);
      } else {
        await addTodo(dataToSubmit);
      }
      form.resetFields();
      onCancel();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  return (
    <Modal
      title={todoToEdit ? "Edit Tugas" : "Tambah Tugas Baru"}
      open={open}
      onOk={handleSubmit}
      onCancel={onCancel}
      okText={todoToEdit ? "Simpan Perubahan" : "Tambah Tugas"}
      cancelText="Batal"
      width={600}
      centered
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          priority: 'medium',
          completed: false
        }}
        style={{ marginTop: 24 }}
      >
        <Form.Item
          name="title"
          label="Judul Tugas"
          rules={[
            { required: true, message: 'Mohon masukkan judul tugas' },
            { min: 3, message: 'Judul minimal harus 3 karakter' }
          ]}
        >
          <Input placeholder="Apa yang harus dikerjakan?" size="large" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Deskripsi"
        >
          <TextArea 
            rows={3} 
            placeholder="Tambahkan detail lebih lanjut (opsional)" 
          />
        </Form.Item>

        <Space size="large" style={{ display: 'flex' }} align="start">
          <Form.Item
            name="categoryId"
            label="Kategori"
            style={{ width: 260 }}
          >
            <Select placeholder="Pilih kategori">
              {categories.map(cat => (
                <Select.Option key={cat.id} value={cat.id}>
                  <Space>
                    <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: cat.color }} />
                    {cat.name}
                  </Space>
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="dueDate"
            label="Tenggat Waktu"
            style={{ width: 260 }}
          >
            <DatePicker style={{ width: '100%' }} format="DD MMM YYYY" />
          </Form.Item>
        </Space>

        <Form.Item
          name="priority"
          label="Prioritas"
        >
          <Radio.Group buttonStyle="solid">
            <Radio.Button value="low">Rendah</Radio.Button>
            <Radio.Button value="medium">Sedang</Radio.Button>
            <Radio.Button value="high">Tinggi</Radio.Button>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TodoForm;
