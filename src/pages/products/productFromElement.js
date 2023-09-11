import {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import { useForm } from "react-hook-form";
import {toast} from "react-toastify";
import productApis from "../../api/baseAdmin/product";
import ClassifyFormElement from "./classifyFormElement";

export default function ProductFormElement({isUpdate = false})
{
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        setValue
    } = useForm({
        defaultValues: {
            name: '',
            price: 0,
            quanlity: 0,
            thumbnail: undefined,
            description: '',
        }
    });
    let urlParams = useParams();
    let navigate = useNavigate();
    useEffect(() => {
        if (isUpdate) {
            (
                async () => {
                    const productResponse = await productApis.show(urlParams.productId);
                    if (productResponse.success) {
                        setValue('name', productResponse.data.name)
                        setValue('description', productResponse.data.description)
                    }
                }
            )()
        }
    }, [isUpdate, urlParams])

    const store = async (data) => {
        const productResponse = await productApis.store(data);

        if (productResponse.success) {
            navigate("/products");
            toast.success(() => <p>Thêm mới product <b>{productResponse.data.name}</b> thành công!</p>);

            return;
        }

        if (!productResponse.errors.length) {
            toast.error(() => <p>Thêm mới product <b>{data.name}</b> thất bại!</p>);

            return;
        }
        productResponse.errors.forEach((error) => {
            const [key, value] = Object.entries(error)[0]
            setError(key, {
                type: 'server',
                message: value.message
            })
        })
    }

    const update = async (data) => {
        const productResponse = await productApis.update(urlParams.productId, data);

        if (productResponse.success) {
            toast.success(() => <p>Chỉnh sửa product <b>{data.name}</b> thành công!</p>);

            return;
        }

        if (!productResponse.errors.length) {
            toast.error(() => <p>Chỉnh sửa product <b>{data.name}</b> thất bại!</p>);
        }
        productResponse.errors.forEach((error) => {
            const [key, value] = Object.entries(error)[0];
            setError(key, {
                type: 'server',
                message: value.message
            })
        })
    }

    return (
        <>
            <form onSubmit={handleSubmit(isUpdate ? update : store)}>
                <div className={'p-3 col-6'}>
                    <div className="mb-3">
                        <label htmlFor="inputName" className="form-label">Tên product <span className={'text-danger fw-bold'}>*</span></label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputName"
                            {...register('name', {
                                required:'Tên product không được để trống',
                                maxLength: {
                                    value: 50,
                                    message: "Tên product không được lớn hơn 50 ký tự"
                                }
                            })}
                        />
                        {errors.name && <p className={'text-danger fw-bold'}>{errors.name.message}</p>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputName" className="form-label">Mô tả <span className={'text-danger fw-bold'}>*</span></label>
                        <input
                            //disabled={isUpdate}
                            type="description"
                            className="form-control"
                            id="inputName"
                            {...register('description')}
                        />
                        {errors.email && <p className={'text-danger fw-bold'}>{errors.email.message}</p>}
                    </div>
                    <ClassifyFormElement />
                </div>
                <div className="card-footer">
                    {
                        (() => {
                            if (isUpdate){
                                return (
                                    <button
                                        className={'btn btn-success'}
                                    >Cập nhật</button>
                                );
                            }

                            return (
                                <button
                                    className={'btn btn-primary'}
                                >
                                    Thêm mới
                                </button>
                            );
                        })()
                    }
                </div>
            </form>
        </>
    )
}