import ContentHeader from "../../components/_common/content/contentHeader";
import { useEffect, useState, useRef} from "react";
import {Link} from "react-router-dom";
import {PAGINATION} from "../../helpers/constants";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {toast} from "react-toastify";
import brandApis from "../../api/baseAdmin/brand";
import CustomPagination from "../../components/_common/customPagination";
import { useForm } from "react-hook-form";

const brandIndexSwal = withReactContent(Swal);

export default function BrandIndex() {
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
            title: 'Quản lý brands',
            link: 'brands'
        },
    ]);
    const [parentTitle] = useState('Quản lý brands');
    const [title] = useState('Danh sách brands');
    const [brands, setbrands] = useState({});
    const currentPage = useRef(PAGINATION.startPage);

    useEffect(() => {
        getbrands();
    }, []);

    const getbrands = (data = {}, page=PAGINATION.startPage) => {
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
                const brandsResponse = await brandApis.index(data, page);
                if (brandsResponse.success) {
                    setbrands(brandsResponse.data);
                }
            }
        )()
    };

    const handleDelete = async (brandId) => {
        brandIndexSwal.fire({
            title: 'Bạn có muốn xóa brand này không?',
            showCancelButton: true,
            confirmButtonText: 'Đồng ý',
            cancelButtonText: 'Hủy'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const deletebrand = await brandApis.destroy(brandId);

                if (deletebrand.success) {
                    toast.success(() => <p>Xóa brand thành công!</p>);
                    getbrands(getValues(), currentPage.current)
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
                                            <th>Tên thương hiệu</th>
                                            <th>Mô tả</th>
                                            <th>Label</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            brands.data && brands.data.map( (brand, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>
                                                            { index + 1 }
                                                        </td>
                                                        <td>
                                                            { brand.name }
                                                        </td>
                                                        <td>
                                                            { brand.description }
                                                        </td>
                                                        <td className={'text-center'}>
                                                            <button type="button" className="btn btn-danger me-2" onClick={() => handleDelete(brand._id)}>Xóa</button>
                                                            <Link to={ brand._id + '/edit' } className="btn btn-success">Chỉnh sửa</Link>
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
                                        page={brands.page}
                                        pages={brands.pages}
                                        onPageChange={page => getbrands(getValues(), page)}
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
