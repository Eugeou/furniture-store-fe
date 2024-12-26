import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useSWR from 'swr';
import { Table, Button, Modal, Form, Select, Input, Checkbox, message, Image } from 'antd';
import { CreatedOrder } from '../Api/types/entities/order-entity';
import { 
  CreateOrder as apiCreateOrder, 
} from '../Api/services/order-service'; 
import { GetAllCoupons } from '../Api/services/coupon-service';
import { getAddress } from '../Api/services/address-service';
import { getCart, deleteCart} from '../Api/services/cart-service'; 
import { GetDetailProduct } from '../Api/services/product-service';
import { Address } from '../Api/types/entities/address-entity';
import { ExistedCoupon } from '../Api/types/entities/coupon-entity';
//import { Product } from '../Api/types/entities/product-entity';
import { Cart } from '../Api/types/entities/cart-entity';

const { Option } = Select;

const OrderPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { subtotal } = location.state as { subtotal: number }; // Lấy Subtotal từ state của react-router-dom

  const userId = localStorage.getItem('userId'); // Lấy userId từ localStorage
  const [loading, setLoading] = useState(false);

  // Fetch danh sách coupon hợp lệ
  const { data: coupons, error: couponsError } = useSWR<ExistedCoupon[]>(
    '/coupon',
    GetAllCoupons,
    {
      // Lọc coupon có EndDate > hôm nay và Quantity > 0
      revalidateOnFocus: false,
      onSuccess: (data) => {
        const today = new Date();
        const validCoupons = data.filter(
          (coupon) => new Date(coupon.EndDate) > today && (coupon.Quantity ?? 0) > 0
        );
        setFilteredCoupons(validCoupons);
      },
      onError: () => {
        message.error('Không thể tải danh sách coupon.');
      },
    }
  );

  const [filteredCoupons, setFilteredCoupons] = useState<ExistedCoupon[]>([]);

  // Fetch danh sách địa chỉ của người dùng
  const { data: addresses, error: addressesError, mutate: mutateAddresses } = useSWR<Address[]>(
    userId ? `/user/address/${userId}` : null, 
    () => getAddress(userId!).then(res => res.data)
  );

  // Fetch dữ liệu giỏ hàng
  const { data: cartData, error: cartError, mutate: mutateCart } = useSWR(
    userId ? `/cart/${userId}` : null, 
    () => getCart(userId!).then(res => res.data)
  );

  const [cartItems, setCartItems] = useState<Cart[]>([]);
  const [productImages, setProductImages] = useState<Record<string, string>>({});

  useEffect(() => {
    if (cartData?.data) {
      setCartItems(cartData.data);
      const fetchImages = async () => {
        const images: Record<string, string> = {};
        for (const item of cartData.data) {
          const productDetail = await GetDetailProduct(item.ProductId);
          images[item.ProductId] = productDetail.ImageSource;
        }
        setProductImages(images);
      };
      fetchImages();
    }
  }, [cartData]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  // Trạng thái cho các select
  const [selectedCoupon, setSelectedCoupon] = useState<ExistedCoupon | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  // Tính toán các phí
  const shippingFee = 30000; // 30.000đ
  const taxFee = parseFloat((subtotal * 0.08).toFixed(2)); // 8% của Subtotal
  const discount = selectedCoupon ? (subtotal * (selectedCoupon.DiscountValue / 100)) : 0;
  const total = subtotal + taxFee + shippingFee - discount;

  // Hàm mở modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Hàm đóng modal
  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setSelectedCoupon(null);
    setSelectedAddress(null);
  };

  // Hàm xử lý submit form
  const onFinish = async (values: any) => {
    if (!userId) {
      message.error('User ID không hợp lệ.');
      return;
    }

    // Lấy OrderItems từ cartData
    const orderItems = cartItems.map(item => item.ProductId);

    // Tạo dữ liệu order
    const orderData: CreatedOrder = {
      PhoneNumber: values.phone,
      Email: values.email,
      PaymentMethod: values.paymentMethod,
      ShippingFee: shippingFee,
      Note: values.note,
      CouponId: selectedCoupon ? selectedCoupon.Id : undefined,
      UserId: userId,
      AddressId: selectedAddress ? selectedAddress.Id : '',
      TaxFee: taxFee,
      SubTotal: subtotal,
      Total: total,
      OrderItems: orderItems,
    };

    setLoading(true);

    console.log("orderData", orderData);

    try {
      const response = await apiCreateOrder(orderData);
      message.success('Đặt hàng thành công!');
      setLoading(false);
      // Có thể thêm logic để xóa giỏ hàng sau khi đặt hàng thành công
      cartItems.forEach(async (item) => {
        await deleteCart(item.ProductId);
      });
      navigate('/shop');
    } catch (error) {
      message.error('Đặt hàng thất bại. Vui lòng thử lại.');
    }
  };

  if (couponsError || addressesError || cartError) {
    return <div>Đã xảy ra lỗi khi tải dữ liệu.</div>;
  }

  if (!coupons || !addresses || !cartData) {
    return <div>Đang tải dữ liệu...</div>;
  }

  return (
    <div className="container mt-5 mb-5 border p-4 bg-white" style={{ borderRadius: '20px' }}>
      <h2 className="text-center">Order Ticket </h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        {/* Số Điện Thoại */}
        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[{ required: true, message: 'Please input phone number!' }]}
        >
          <Input placeholder="Please input phone number" />
        </Form.Item>

        {/* Email */}
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Please input email!' },
            { type: 'email', message: 'Invalid email' }
          ]}
        >
          <Input placeholder="Please input email" />
        </Form.Item>

        {/* Ghi Chú */}
        <Form.Item
          name="note"
          label="Note for us"
        >
          <Input.TextArea placeholder="Please input note for us if you want" />
        </Form.Item>

        {/* Phương Thức Thanh Toán */}
        <Form.Item
          name="paymentMethod"
          label="Payment Method"
          rules={[{ required: true, message: 'Please select a payment method!' }]}
        >
          <Select placeholder="Select a payment method">
            <Option value={0}>Pay by Cash</Option>
            <Option value={1}>VNPay</Option>
          </Select>
        </Form.Item>

        {/* Coupon */}
        <Form.Item
          name="CouponId"
          label="Coupon (Optional)"
        >
          <Select
            placeholder="Select a coupon"
            onChange={(value: string) => {
              const coupon = filteredCoupons.find(c => c.Id === value);
              setSelectedCoupon(coupon || null);
            }}
            allowClear
          >
            {filteredCoupons.map(coupon => (
              <Option key={coupon.Id} value={coupon.Id}>
                <div>
                  <Image
                    src={coupon.ImageSource}
                    alt="Coupon"
                    style={{ width: '40px', marginRight: '10px' }}
                  />
                  {coupon.Description}
                </div>
                
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* Địa Chỉ */}
        <Form.Item
          name="address"
          label="Shipping Address"
          rules={[{ required: true, message: 'Please select an address!' }]}
        >
          <Select
            placeholder="Select an address"
            onChange={(value: string) => {
              const address = addresses.find(addr => addr.Id === value);
              setSelectedAddress(address || null);
            }}
            allowClear
          >
            {addresses.map(address => (
              <Option key={address.Id} value={address.Id}>
                {`${address.SpecificAddress}, ${address.Ward}, ${address.District}, ${address.Province}`}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* Tổng Hợp Đơn Hàng */}
        <div className="mb-3">
          <h4>Order Summary</h4>
          <Table
            dataSource={cartItems}
            pagination={false}
            rowKey="ProductId"
            columns={[
              {
                title: 'Product',
                dataIndex: 'ProductId',
                key: 'product',
                render: (text: string) => (
                  <img
                    src={productImages[text] || ''}
                    alt="Product"
                    style={{ width: '50px', marginRight: '10px' }}
                  />
                ),
              },
              {
                title: 'Product Name',
                dataIndex: 'ProductName',
                key: 'productName',
              },
              {
                title: 'Unit Price',
                dataIndex: 'Price',
                key: 'price',
                render: (price: number) => `${price.toLocaleString()} đ`,
              },
            //   {
            //     title: 'Số Lượng',
            //     dataIndex: 'Quantity',
            //     key: 'quantity',
            //   },
            //   {
            //     title: 'Thành Tiền',
            //     key: 'total',
            //     render: (_: any, record: Product) => `${(record.Price * record.Quantity).toLocaleString()} đ`,
            //   },
            ]}
          />
        </div>

        {/* Chi Tiết Phí */}
        <div className="mb-3 text-end">
          <p><strong>Subtotal:</strong> {subtotal.toLocaleString()} đ</p>
          <p><strong>Tax Fee (8%):</strong> {taxFee.toLocaleString()} đ</p>
          <p><strong>Shipping Fee:</strong> {shippingFee.toLocaleString()} đ</p>
          <p><strong>Discount:</strong> {discount.toLocaleString()} đ</p>
          <p><strong>Total:</strong> {total.toLocaleString()} đ</p>
        </div>

        {/* Nút Đặt Hàng */}
        <Form.Item>
          <Button type="primary" htmlType="submit"  style={{ width: '100%', backgroundColor: '#3b5d50', color: 'white', padding: "10px" }}>
            Order Now
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default OrderPage;