import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Select } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from './../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';

const { Option } = Select;

const UpdateProduct = () => {
    const navigate = useNavigate();
    const params = useParams();

    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [shipping, setShipping] = useState('');
    const [photo, setPhoto] = useState('');
    const [id, setId] = useState('');

    // get single product
    const getSingleProduct = async () => {
        try {
            const { data } = await axios.get(`/api/v1/product/get-product/${params?.slug}`);
            if (data?.success) {
                setId(data.product._id);
                setName(data.product.name);
                setDescription(data.product.description);
                setPrice(data.product.price);
                setQuantity(data.product.quantity);
                setShipping(data.product.shipping);
                setCategory(data.product.category._id);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        getSingleProduct();
    }, []);

    // get all categories
    const getAllCategories = async () => {
        try {
            const { data } = await axios.get('/api/v1/category/get-category');
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        getAllCategories();
    }, []);

    // handle update product
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const productData = new FormData();
            productData.append('name', name);
            productData.append('description', description);
            productData.append('price', price);
            productData.append('quantity', quantity);
            photo && productData.append('photo', photo);
            productData.append('category', category);

            const { data } = await axios.put(`/api/v1/product/update-product/${id}`, productData);
            if (data?.success) {
                toast.success('Update product success');
                navigate('/dashboard/admin/products');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    // handle delete product
    const handleDelete = async () => {
        try {
            let answer = window.prompt('Are You Sure want to delete this product ? ');
            if (!answer) return;
            const { data } = await axios.delete(`/api/v1/product/delete-product/${id}`);
            toast.success('Delete product success');
            navigate('/dashboard/admin/products');
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <Layout title={'Dashboard - Create Product'}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>Update Product</h1>
                        <div className="m-1 w-75">
                            <Select
                                bordered={false}
                                placeholder="Select a category"
                                size="large"
                                showSearch
                                className="form-select mb-3"
                                onChange={(value) => {
                                    setCategory(value);
                                }}
                                value={category}
                            >
                                {categories?.map((c) => (
                                    <Option key={c._id} value={c._id}>
                                        {c.name}
                                    </Option>
                                ))}
                            </Select>
                            <div className="mb-3">
                                <label className="btn btn-outline-secondary col-md-12">
                                    {photo ? photo.name : 'Upload Photo'}
                                    <input
                                        type="file"
                                        name="photo"
                                        accept="image/*"
                                        onChange={(e) => setPhoto(e.target.files[0])}
                                        hidden
                                    ></input>
                                </label>
                            </div>
                            <div className="mb-3">
                                {photo ? (
                                    <div className="text-center">
                                        <img
                                            src={URL.createObjectURL(photo)}
                                            alt="product_photo"
                                            height={'200px'}
                                            className="img img-responsive"
                                        />
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <img
                                            src={`/api/v1/product/product-photo/${id}`}
                                            alt="product_photo"
                                            height={'200px'}
                                            className="img img-responsive"
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    value={name}
                                    placeholder="Write product name"
                                    onChange={(e) => setName(e.target.value)}
                                    className="form-control"
                                />
                            </div>

                            <div className="mb-3">
                                <textarea
                                    type="text"
                                    value={description}
                                    placeholder="Write product description"
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="form-control"
                                />
                            </div>

                            <div className="mb-3">
                                <input
                                    type="number"
                                    value={price}
                                    placeholder="Write product price"
                                    onChange={(e) => setPrice(e.target.value)}
                                    className="form-control"
                                />
                            </div>

                            <div className="mb-3">
                                <input
                                    type="number"
                                    value={quantity}
                                    placeholder="Write product quantity"
                                    onChange={(e) => setQuantity(e.target.value)}
                                    className="form-control"
                                />
                            </div>

                            <div className="mb-3">
                                <Select
                                    bordered={false}
                                    placeholder="Select shipping"
                                    size="large"
                                    showSearch
                                    className="form-select mb-3"
                                    onChange={(value) => setShipping(value)}
                                    value={shipping ? 'Yes' : 'No'}
                                >
                                    <Option value="1">Yes</Option>
                                    <Option value="0">No</Option>
                                </Select>
                            </div>
                            <div className="mb-3">
                                <button className="btn btn-primary" onClick={handleUpdate}>
                                    UPDATE PRODUCT
                                </button>
                            </div>
                            <div className="mb-3">
                                <button className="btn btn-danger" onClick={handleDelete}>
                                    DELETE PRODUCT
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default UpdateProduct;
