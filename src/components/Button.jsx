
export default function Button({buttonType, id, text, handleOnClick}) {

    return (
        <button id={`_${id}`} className={buttonType} onClick={()=> handleOnClick(buttonType, text)}>{text}</button>
    )
}
