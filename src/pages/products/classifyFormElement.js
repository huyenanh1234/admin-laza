import { useRef } from "react"

export default function ClassifyFormElement() {
    const inputEl=useRef(null)
    const RemoveClassify = () => {
        console.log(inputEl.current.parentElement);
        inputEl.current.parentElement.remove();
    }
    return (
        <div className="mb-3">
            <div>
                <button ref={inputEl} className="btnRemoveClassify" onClick={RemoveClassify}>Xóa</button>
                <input
                    //disabled={isUpdate}
                    // type="description"
                    className="form-control"
                    placeholder="Price"
                // id="inputName"
                // {...register('description')}
                />
                {/* {errors.email && <p className={'text-danger fw-bold'}>{errors.email.message}</p>} */}
                <input
                    className="form-control"
                    placeholder="Quanlity"
                />
                <img src="/images/avatar.png"/>
            </div>
        </div>
    )
}