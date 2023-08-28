import {useEffect, useState, useRef} from "react";
import ContentHeader from "../../components/_common/content/contentHeader";
import {USER} from "../../helpers/constants";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import profileApis from "../../api/baseAdmin/profile";
import { generateFileToUrl } from "../../helpers/common";
import { useDispatch, useSelector } from "react-redux";
import { updateAuthUser } from "../../features/auth/authSlice";

export default function ProfileIndex()
{

    const auth = useSelector(state=> state.auth)
    const dispatch = useDispatch()

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        setValue,
        getValues,
    } = useForm({
        defaultValues: {
            name: '',
            avatar: null
        }
    });
    const [breadcrumb] = useState([
        {
            title: 'Home',
            link: '/'
        },
        {
            title: 'Profile',
            link: 'profile'
        },
    ]);
    const [title] = useState('Profile');
    const imageRef = useRef()
    useEffect(()=>{
        if(auth.user){
            setValue("name", auth.user?.name);
            setValue("avatar", auth.user?.avatarURL);
            setValue("phone", auth.user?.phone);
            setValue("email", auth.user?.email);
        }
    },[auth.user])

    const update = async (data) => {
        const formData = new FormData();
        formData.append('name', data.name);

        if (data.avatar) {
            formData.append('avatar', data.avatar[0]);
        }
        try {
            const updateProfileResponse = await profileApis.update(formData);

            if (updateProfileResponse.success) {
                const profileResponse = await profileApis.show();

                if (profileResponse.success) {
                    dispatch(updateAuthUser(profileResponse.data))
                    toast.success(() => <p>Update profile thành công!</p>);

                    return;
                }
                throw new Error();
            }
            throw new Error();
        } catch (e) {
            toast.error(() => <p>Update profile thất bại</p>);
        }
    };

    const handleChange = async(e)=>{
        if (e.target.files[0]){
            imageRef.current.src = URL.createObjectURL(e.target.files[0]);
        }
    }
    
    return (
        <>
            <ContentHeader breadcrumb={breadcrumb}/>
            <section className={'content profile'}>
                <div className={'container-fluid'}>
                    <div className={'row'}>
                        <div className={'col-12'}>
                            <div className="card mb-3">
                                <div className="card-header text-white bg-success">
                                    <h3 className="card-title">{ title }</h3>
                                </div>
                                <form onSubmit={handleSubmit(update)}>
                                    
                                    <div className={'p-3 col-6'}>
                                        <div className="mb-3">
                                            <img 
                                                src={auth.user?.avatarUrl} 
                                                className={"mb-2 avatar"} 
                                                alt={"avatar user"}
                                                ref={imageRef}
                                            />
                                            <input
                                                type="file"
                                                className="form-control"
                                                id="changeAvatar"
                                                {...register('avatar', {
                                                    maxLength: {
                                                        value: 50,
                                                        message: "Họ tên không được lớn hơn 50 ký tự"
                                                    }
                                                })}
                                                onChange={(e) => handleChange(e)}
                                            />
                                            {errors.name && <p className={'text-danger fw-bold'}>{errors.name.message}</p>}
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="inputName" className="form-label">Họ tên <span className={'text-danger fw-bold'}>*</span></label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="inputName"
                                                {...register('name', {
                                                    required:'Họ tên không được để trống',
                                                    maxLength: {
                                                        value: 50,
                                                        message: "Họ tên không được lớn hơn 50 ký tự"
                                                    }
                                                })}
                                            />
                                            {errors.name && <p className={'text-danger fw-bold'}>{errors.name.message}</p>}
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="inputName" className="form-label">Email <span className={'text-danger fw-bold'}>*</span></label>
                                            <input
                                                
                                                type="email"
                                                className="form-control"
                                                id="inputName"
                                                {...register('email', {
                                                    required:'Email không được để trống',
                                                    maxLength: {
                                                        value: 50,
                                                        message: "Email không được lớn hơn 50 ký tự"
                                                    }
                                                })}
                                            />
                                            {errors.email && <p className={'text-danger fw-bold'}>{errors.email.message}</p>}
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="inputPhone" className="form-label">Số điện thoại <span className={'text-danger fw-bold'}>*</span></label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="inputPhone"
                                                {...register('phone', {
                                                    required:'Số điện thoại không được để trống',
                                                    maxLength: {
                                                        value: 11,
                                                        message: "Số điện thoại không được lớn hơn 11 ký tự"
                                                    },
                                                    minLength: {
                                                        value: 10,
                                                        message: "Số điện thoại không được ít hơn 10 ký tự"
                                                    }
                                                })}
                                            />
                                            {errors.phone && <p className={'text-danger fw-bold'}>{errors.phone.message}</p>}
                                        </div>
                                        <div className={'mb-3'}>
                                            <div>
                                                <label className="form-label">Phân quyền <span className={'text-danger fw-bold'}>*</span></label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    id="inputLevelAdmin"
                                                    checked={ auth.user?.level === USER.levels.admin.value}
                                                    {...register('level')}
                                                />
                                                <label className="form-check-label" htmlFor="inputLevelAdmin">
                                                    { USER.levels.admin.label }
                                                </label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    id="inputLevelUser"
                                                    checked={ auth.user?.level === USER.levels.user.value}
                                                    {...register('level')}
                                                />
                                                <label className="form-check-label" htmlFor="inputLevelUser">
                                                    { USER.levels.user.label }
                                                </label>
                                            </div>
                                            {errors.level && <p className={'text-danger fw-bold'}>{errors.level.message}</p>}
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <button
                                            type="submit"
                                            className={'btn btn-success'}
                                        >
                                            Cập nhật
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}