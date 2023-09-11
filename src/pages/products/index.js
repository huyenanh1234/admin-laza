import ContentHeader from "../../components/_common/content/contentHeader";
import { useEffect, useState, useRef} from "react";
import {Link} from "react-router-dom";
import {PAGINATION} from "../../helpers/constants";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {toast} from "react-toastify";
import CustomPagination from "../../components/_common/customPagination";
import { useForm } from "react-hook-form";
import productApis from "../../api/baseAdmin/product";

const productIndexSwal = withReactContent(Swal);

export default function ProductIndex() {
    const {
        getValues
    }= useForm({
        defaultValues: {
            name:"",
            description: ''
        }
    });
    const [breadcrumb] = useState([
        {
            title: 'Home',
            link: '/'
        },
        {
            title: 'Quản lý products',
            link: 'products'
        },
    ]);
    const [parentTitle] = useState('Quản lý products');
    const [title] = useState('Danh sách products');
    const [products, setproducts] = useState({});
    const currentPage = useRef(PAGINATION.startPage);

    useEffect(() => {
        getproducts();
    }, []);

    const getproducts = (data = {}, page=PAGINATION.startPage) => {
        if (page !== currentPage.current) {
            currentPage.current = page;
        }
        (
            async () => {
                for (const field in data) {
                    if (!data[field]) {
                        delete data[field];
                    }
                }                
                const productsResponse = await productApis.index(data, page);
                if (productsResponse.success) {
                    setproducts(productsResponse.data);
                }
            }
        )()
    };

    const handleDelete = async (productId) => {
        productIndexSwal.fire({
            title: 'Bạn có muốn xóa product này không?',
            showCancelButton: true,
            confirmButtonText: 'Đồng ý',
            cancelButtonText: 'Hủy'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const deleteproduct = await productApis.destroy(productId);

                if (deleteproduct.success) {
                    toast.success(() => <p>Xóa product thành công!</p>);
                    getproducts(getValues(), currentPage.current)
                }
            }
        })
    };
    return (
        <>
            <ContentHeader breadcrumb={breadcrumb} title={parentTitle}/>
            <section className={'content'}>
                <div className={'container-fluid'}>
                    <div className={'row'}>
                        <div className={'col-12'}>
                            <div className="card mb-3">
                                <div className="card-header">
                                    <h3 className="card-title">{ title }</h3>
                                </div>
                                <div className={'card-body'}>
                                    <table className="table table-bordered">
                                        <thead>
                                        <tr className={'text-center'}>
                                            <th style={{width:10}}>#</th>
                                            <th>Tên product</th>
                                            <th>Mô tả</th>
                                            <th>Giá</th>
                                            <th>Thumbnail</th>
                                            <th>Số lượng</th>
                                            <th>Label</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            products.data && products.data.map( (product, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>
                                                            { index + 1 }
                                                        </td>
                                                        <td>
                                                            { product.name }
                                                        </td>
                                                        <td>
                                                            { product.description }
                                                        </td>
                                                        <td className={'text-center'}>
                                                            <button type="button" className="btn btn-danger me-2" onClick={() => handleDelete(product._id)}>Xóa</button>
                                                            <Link to={ product._id + '/edit' } className="btn btn-success">Chỉnh sửa</Link>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        </tbody>
                                    </table>
                                    <>
                                    </>
                                    <CustomPagination
                                        page={products.page}
                                        pages={products.pages}
                                        onPageChange={page => getproducts(getValues(), page)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
