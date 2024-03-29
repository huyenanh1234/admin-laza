import {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import { useForm } from "react-hook-form";
import {toast} from "react-toastify";
import categoryApis from "../../api/baseAdmin/category";

export default function CategoryFormElement({isUpdate = false})
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
                    console.log(urlParams.categoryId);
                    const categoryResponse = await categoryApis.show(urlParams.categoryId);
                    if (categoryResponse.success) {
                        setValue('name', categoryResponse.data.name)
                        setValue('description', categoryResponse.data.description)
                    }
                }
            )()
        }
    }, [isUpdate, urlParams])

    const store = async (data) => {
        const categoryResponse = await categoryApis.store(data);

        if (categoryResponse.success) {
            navigate("/categories");
            toast.success(() => <p>Thêm mới category <b>{categoryResponse.data.name}</b> thành công!</p>);

            return;
        }

        if (!categoryResponse.errors.length) {
            toast.error(() => <p>Thêm mới category <b>{data.name}</b> thất bại!</p>);

            return;
        }
        categoryResponse.errors.forEach((error) => {
            const [key, value] = Object.entries(error)[0]
            setError(key, {
                type: 'server',
                message: value.message
            })
        })
    }

    const update = async (data) => {
        const categoryResponse = await categoryApis.update(urlParams.categoryId, data);

        if (categoryResponse.success) {
            toast.success(() => <p>Chỉnh sửa category <b>{data.name}</b> thành công!</p>);

            return;
        }

        if (!categoryResponse.errors.length) {
            toast.error(() => <p>Chỉnh sửa category <b>{data.name}</b> thất bại!</p>);
        }
        categoryResponse.errors.forEach((error) => {
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
                        <label htmlFor="inputName" className="form-label">Tên danh mục <span className={'text-danger fw-bold'}>*</span></label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputName"
                            {...register('name', {
                                required:'Tên danh mục không được để trống',
                                maxLength: {
                                    value: 50,
                                    message: "Tên danh mục không được lớn hơn 50 ký tự"
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