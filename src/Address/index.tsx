import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import { Table, Button, Modal, Form, Select, Input, Checkbox, message } from 'antd';
import { Address, CreateAddress } from '../Api/types/entities/address-entity';
import { 
  createAddress as apiCreateAddress, 
  updateAddress as apiUpdateAddress, 
  deleteAddress as apiDeleteAddress, 
  getAddress 
} from '../Api/services/address-service';
import { getProvinces, getDistrict, getWard, Province, District, Ward } from '../Api/services/provinceVN-service';
import { GetMe } from '../Api/services/auth-service';
import { UserProps } from '../Api/types/entities/auth-entity';

const { Option } = Select;

const AddressPage: React.FC = () => {
  const userId = localStorage.getItem('userId'); // Lấy userId từ localStorage
    const { data: user } = useSWR<UserProps>(userId ? `/user/${userId}` : null, () => GetMe(userId!));
  // Sử dụng useSWR để fetch danh sách địa chỉ của người dùng
  const { data: addresses, error, mutate } = useSWR<Address[]>(
    userId ? `/user/address/${userId}` : null, 
    () => getAddress(userId!).then(res => res.data)
  );

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentAddress, setCurrentAddress] = useState<Address | null>(null);
  const [form] = Form.useForm();

  // Trạng thái cho các select Province, District, Ward
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);

  useEffect(() => {
    // Fetch danh sách tỉnh/thành phố khi component mount
    const fetchProvinces = async () => {
      try {
        const res = await getProvinces();
        setProvinces(res.data.results);
      } catch (err) {
        message.error('Không thể tải danh sách tỉnh/thành phố.');
      }
    };
    fetchProvinces();
  }, []);

  console.log("provinces", provinces);
  console.log ("user", user);

  // Hàm xử lý khi chọn Province
  const handleProvinceChange = async (value: string) => {
    form.setFieldsValue({ district: undefined, ward: undefined });
    try {
      const selectedProvince = provinces.find(p => p.province_name === value);
      if (selectedProvince) {
        const res = await getDistrict(selectedProvince.province_id);
        setDistricts(res.data.results);
      }
    } catch (err) {
      message.error('Không thể tải danh sách quận/huyện.');
    }
    setWards([]); // Reset danh sách phường/xã khi thay đổi tỉnh
  };

  // Hàm xử lý khi chọn District
  const handleDistrictChange = async (value: string) => {
    form.setFieldsValue({ ward: undefined });
    try {
      const selectedDistrict = districts.find(d => d.district_name === value);
      if (selectedDistrict) {
        const res = await getWard(selectedDistrict.district_id);
        setWards(res.data.results);
      }
    } catch (err) {
      message.error('Không thể tải danh sách phường/xã.');
    }
  };

  // Hàm mở modal thêm hoặc sửa địa chỉ
  const showModal = (address?: Address) => {
    if (address) {
      setIsEdit(true);
      setCurrentAddress(address);
      form.setFieldsValue({
        province: address.Province,
        district: address.District,
        ward: address.Ward,
        specificAddress: address.SpecificAddress,
        postalCode: address.PostalCode,
        isDefault: address.IsDefault,
      });

      // Fetch districts và wards dựa trên địa chỉ hiện tại
      (async () => {
        try {
          const selectedProvince = provinces.find(p => p.province_name === address.Province);
          if (selectedProvince) {
            const resDistrict = await getDistrict(selectedProvince.province_id);
            setDistricts(resDistrict.data);
            const selectedDistrict = resDistrict.data.find((d: { district_name: string; }) => d.district_name === address.District);
            if (selectedDistrict) {
              const resWard = await getWard(selectedDistrict.district_id);
              setWards(resWard.data);
            }
          }
        } catch (err) {
          message.error('Không thể tải danh sách quận/huyện/phường/xã.');
        }
      })();
    } else {
      setIsEdit(false);
      setCurrentAddress(null);
      form.resetFields();
      setDistricts([]);
      setWards([]);
    }
    setIsModalVisible(true);
  };

  // Hàm đóng modal
  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentAddress(null);
    form.resetFields();
    setDistricts([]);
    setWards([]);
  };

  // Hàm xử lý submit form
  const onFinish = async (values: any) => {
    try {
      if (isEdit && currentAddress) {
        await apiUpdateAddress(currentAddress.Id, values);
        message.success('Cập nhật địa chỉ thành công!');
      } else {
        await apiCreateAddress(userId!, values);
        message.success('Thêm địa chỉ thành công!');
      }
      mutate(); // Reload dữ liệu
      handleCancel();
    } catch (error) {
      message.error('Có lỗi xảy ra!');
    }
  };

  // Hàm xử lý xoá địa chỉ
  const handleDelete = async (id: string) => {
    try {
      await apiDeleteAddress(id);
      message.success('Xoá địa chỉ thành công!');
      mutate();
    } catch (error) {
      message.error('Có lỗi xảy ra!');
    }
  };

  // Cấu hình cột cho bảng
  const columns = [
    {
      title: 'Province',
      dataIndex: 'Province',
      key: 'province',
    },
    {
      title: 'District',
      dataIndex: 'District',
      key: 'district',
    },
    {
      title: 'Ward',
      dataIndex: 'Ward',
      key: 'ward',
    },
    {
      title: 'Specific Address',
      dataIndex: 'SpecificAddress',
      key: 'specificAddress',
    },
    {
      title: 'Postal Code',
      dataIndex: 'PostalCode',
      key: 'postalCode',
    },
    {
      title: 'Default',
      dataIndex: 'IsDefault',
      key: 'isDefault',
      render: (isDefault: boolean) => (isDefault ? 'Yes' : 'No'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Address) => (
        <div className='d-flex'>
          <Button type="primary" className="me-2" onClick={() => showModal(record)}>
            Edit
          </Button>
          <Button type="primary" danger onClick={() => handleDelete(record.Id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  if (error) return <div>Failed to load addresses.</div>;
  if (!addresses) return <div>Loading...</div>;

  return (
    <div className="container mt-5">
      <h2>Address Management</h2>
      <h4 className="mt-3">Hi, {user?.FullName}, this is your address list</h4>
      <Button type="primary" className="mb-2 mt-2 p-2" style={{ backgroundColor: '#f0c14b', borderColor: '#a88734', color: 'black' }} onClick={() => showModal()}>
        Add New Address
      </Button>
      <Table dataSource={addresses} columns={columns} rowKey="Id" className='mt-3 mb-5' />

      <Modal 
        title={isEdit ? 'Edit Address' : 'Add New Address'} 
        visible={isModalVisible} 
        onCancel={handleCancel} 
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          {/* Select Province */}
          <Form.Item 
            name="province" 
            label="Province" 
            rules={[{ required: true, message: 'Please select a province' }]}
          >
            <Select 
              placeholder="Select Province" 
              onChange={handleProvinceChange}
              allowClear
            >
              {Array.isArray(provinces) && provinces?.map((province) => (
                <Option key={province.province_id} value={province.province_name}>
                  {province.province_name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* Select District */}
          <Form.Item 
            name="district" 
            label="District" 
            rules={[{ required: true, message: 'Please select a district' }]}
          >
            <Select 
              placeholder="Select District" 
              onChange={handleDistrictChange}
              allowClear
              disabled={districts.length === 0}
            >
              { Array.isArray(districts) && districts?.map((district) => (
                <Option key={district.district_id} value={district.district_name}>
                  {district.district_name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* Select Ward */}
          <Form.Item 
            name="ward" 
            label="Ward" 
            rules={[{ required: true, message: 'Please select a ward' }]}
          >
            <Select 
              placeholder="Select Ward" 
              allowClear
              disabled={wards.length === 0}
            >
              { Array.isArray(wards) && wards?.map((ward) => (
                <Option key={ward.ward_id} value={ward.ward_name}>
                  {ward.ward_name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* Specific Address */}
          <Form.Item 
            name="specificAddress" 
            label="Specific Address" 
            rules={[{ required: true, message: 'Please enter your specific address' }]}
          >
            <Input placeholder="Enter specific address" />
          </Form.Item>

          {/* Postal Code */}
          <Form.Item 
            name="postalCode" 
            label="Postal Code" 
            rules={[{ required: true, message: 'Please enter your postal code' }]}
          >
            <Input placeholder="Enter postal code" />
          </Form.Item>

          {/* Set as Default Address */}
          <Form.Item name="isDefault" valuePropName="checked">
            <Checkbox>Set as default address</Checkbox>
          </Form.Item>

          {/* Buttons Submit và Cancel */}
          <Form.Item>
            <Button type="primary" htmlType="submit" className="me-2">
              {isEdit ? 'Update' : 'Add'}
            </Button>
            <Button onClick={handleCancel}>Cancel</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddressPage;