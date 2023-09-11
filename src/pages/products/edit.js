import ContentHeader from "../../components/_common/content/contentHeader";
import { useState } from "react";
import ProductFormElement from "./productFromElement";


export default function ProductEdit() {
    const [breadcrumb] = useState([
        {
            title: 'Home',
            link: '/'
        },
        {
            title: 'Quản lý products',
            link: 'products'
        },
    ])
    const [parentTitle] = useState('Quản lý products')
    const [title] = useState('Chỉnh sửa products')

    return (
        <>
            <ContentHeader breadcrumb={breadcrumb} title={parentTitle}/>
            <section className={'content'}>
                <div className={'container-fluid'}>
                    <div className={'row'}>
                        <div className={'col-12'}>
                            <div className="card mb-3">
                                <div className="card-header text-white bg-success">
                                    <h3 className="card-title">{ title }</h3>
                                </div>
                                <ProductFormElement isUpdate />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}