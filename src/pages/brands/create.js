import ContentHeader from "../../components/_common/content/contentHeader";
import BrandFormElement from "./brandFormElement";
import { useState } from "react";

export default function BrandCreate() {
    const [breadcrumb] = useState([
        {
            title: 'Home',
            link: '/'
        },
        {
            title: 'Quản lý brands',
            link: 'brands'
        },
    ])
    const [parentTitle] = useState('Quản lý brands')
    const [title] = useState('Thêm mới brand')

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
                                <BrandFormElement />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}