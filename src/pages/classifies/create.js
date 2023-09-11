import ContentHeader from "../../components/_common/content/contentHeader";
import { useState } from "react";
import CategoryFormElement from "./categoryFormElement";

export default function CategoryCreate() {
    const [breadcrumb] = useState([
        {
            title: 'Home',
            link: '/'
        },
        {
            title: 'Quản lý categories',
            link: 'categories'
        },
    ])
    const [parentTitle] = useState('Quản lý categories')
    const [title] = useState('Thêm mới category')

    return (
        <>
            <ContentHeader breadcrumb={breadcrumb} title={parentTitle}/>
            <section className={'content'}>
                <div className={'container-fluid'}>
                    <div className={'row'}>
                        <div className={'col-12'}>
                            <div className="card mb-3">
                                <div className="card-header text-white bg-primary">
                                    <h3 className="card-title">{ title }</h3>
                                </div>
                                <CategoryFormElement />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}