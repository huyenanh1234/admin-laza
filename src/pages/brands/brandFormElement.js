import {useEffect} from "react";
import brandApis from "../../api/baseAdmin/brand";
import {useNavigate, useParams} from "react-router-dom";
import { useForm } from "react-hook-form";
import {toast} from "react-toastify";

export default function BrandFormElement({isUpdate = false})
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
            description: '',
        }
    });
    let urlParams = useParams();
    let navigate = useNavigate();
    useEffect(() => {
        if (isUpdate) {
            (
                async () => {
                    const brandResponse = await brandApis.show(urlParams.brandId);
                    if (brandResponse.success) {
                        setValue('name', brandResponse.data.name)
                        setValue('description', brandResponse.data.description)
                    }
                }
            )()
        }
    }, [isUpdate, urlParams])

    const store = async (data) => {
        const brandResponse = await brandApis.store(data);

        if (brandResponse.success) {
            navigate("/brands");
            toast.success(() => <p>Thêm mới brand <b>{brandResponse.data.name}</b> thành công!</p>);

            return;
        }

        if (!brandResponse.errors.length) {
            toast.error(() => <p>Thêm mới brand <b>{data.name}</b> thất bại!</p>);

            return;
        }
        brandResponse.errors.forEach((error) => {
            const [key, value] = Object.entries(error)[0]
            setError(key, {
                type: 'server',
                message: value.message
            })
        })
    }

    const update = async (data) => {
        const brandResponse = await brandApis.update(urlParams.brandId, data);

        if (brandResponse.success) {
            toast.success(() => <p>Chỉnh sửa brand <b>{data.name}</b> thành công!</p>);

            return;
        }

        if (!brandResponse.errors.length) {
            toast.error(() => <p>Chỉnh sửa brand <b>{data.name}</b> thất bại!</p>);
        }
        brandResponse.errors.forEach((error) => {
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
                        <label htmlFor="inputName" className="form-label">Tên thương hiệu <span className={'text-danger fw-bold'}>*</span></label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputName"
                            {...register('name', {
                                required:'Tên thương hiệu không được để trống',
                                maxLength: {
                                    value: 50,
                                    message: "Tên thương hiệu không được lớn hơn 50 ký tự"
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