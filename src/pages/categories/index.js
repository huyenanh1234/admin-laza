import ContentHeader from "../../components/_common/content/contentHeader";
import { useEffect, useState, useRef} from "react";
import {Link} from "react-router-dom";
import {PAGINATION} from "../../helpers/constants";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {toast} from "react-toastify";
import categorydApis from "../../api/baseAdmin/category";
import CustomPagination from "../../components/_common/customPagination";
import { useForm } from "react-hook-form";
import categoryApis from "../../api/baseAdmin/category";

const categoryIndexSwal = withReactContent(Swal);

export default function CategoryIndex() {
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
            title: 'Quản lý categories',
            link: 'categories'
        },
    ]);
    const [parentTitle] = useState('Quản lý categories');
    const [title] = useState('Danh sách categories');
    const [categories, setcategories] = useState({});
    const currentPage = useRef(PAGINATION.startPage);

    useEffect(() => {
        getcategories();
    }, []);

    const getcategories = (data = {}, page=PAGINATION.startPage) => {
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
                const categoriesResponse = await categoryApis.index(data, page);
                if (categoriesResponse.success) {
                    setcategories(categoriesResponse.data);
                }
            }
        )()
    };

    const handleDelete = async (categoryId) => {
        categoryIndexSwal.fire({
            title: 'Bạn có muốn xóa category này không?',
            showCancelButton: true,
            confirmButtonText: 'Đồng ý',
            cancelButtonText: 'Hủy'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const deletecategory = await categoryApis.destroy(categoryId);

                if (deletecategory.success) {
                    toast.success(() => <p>Xóa category thành công!</p>);
                    getcategories(getValues(), currentPage.current)
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
                                            <th>Tên danh mục</th>
                                            <th>Mô tả</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            categories.data && categories.data.map( (category, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>
                                                            { index + 1 }
                                                        </td>
                                                        <td>
                                                            { category.name }
                                                        </td>
                                                        <td>
                                                            { category.description }
                                                        </td>
                                                        <td className={'text-center'}>
                                                            <button type="button" className="btn btn-danger me-2" onClick={() => handleDelete(category._id)}>Xóa</button>
                                                            <Link to={ category._id + '/edit' } className="btn btn-success">Chỉnh sửa</Link>
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
                                        page={categories.page}
                                        pages={categories.pages}
                                        onPageChange={page => getcategories(getValues(), page)}
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
