import { useState } from 'react';
import { 
  Modal, 
  List, 
  Input, 
  Button, 
  Space, 
  ColorPicker, 
  Typography, 
  Popconfirm,
  Divider
} from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { useTodo } from '../context/TodoContext';

const { Text } = Typography;

const CategoryManager = ({ open, onCancel }) => {
  const { categories, addCategory, deleteCategory } = useTodo();
  const [newName, setNewName] = useState('');
  const [newColor, setNewColor] = useState('#1677ff');

  const handleAdd = () => {
    if (!newName) return;
    addCategory({ name: newName, color: newColor });
    setNewName('');
  };

  return (
    <Modal
      title="Kelola Kategori"
      open={open}
      onCancel={onCancel}
      footer={[
        <Button key="close" type="primary" onClick={onCancel}>
          Selesai
        </Button>
      ]}
      width={400}
    >
      <div style={{ marginBottom: 24 }}>
        <Text strong>Tambah Kategori Baru</Text>
        <Space.Compact style={{ width: '100%', marginTop: 8 }}>
          <Input 
            placeholder="Nama kategori" 
            value={newName} 
            onChange={(e) => setNewName(e.target.value)} 
          />
          <ColorPicker 
            value={newColor} 
            onChange={(color) => setNewColor(color.toHexString())} 
          />
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd} disabled={!newName.trim()}>
            Tambah
          </Button>
        </Space.Compact>
      </div>

      <Divider />

      <List
        header={<Text strong>Daftar Kategori</Text>}
        dataSource={categories}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Popconfirm
                title="Hapus kategori?"
                description="Todo dengan kategori ini akan kehilangan kategorinya."
                onConfirm={() => deleteCategory(item.id)}
                okText="Ya"
                cancelText="Tidak"
              >
                <Button type="text" danger icon={<DeleteOutlined />} />
              </Popconfirm>
            ]}
          >
            <Space>
              <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: item.color }} />
              <Text>{item.name}</Text>
            </Space>
          </List.Item>
        )}
        style={{ maxHeight: 300, overflowY: 'auto' }}
      />
    </Modal>
  );
};

export default CategoryManager;
