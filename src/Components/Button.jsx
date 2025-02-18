const Button = ({ children, handleClick, width }) => {

    return (
        <button className={`${width ? "w-12" : "w-24"} h-12 border-gray rounded-full select-none border hover:cursor-pointer grid place-items-center active:bg-gray`} onClick={() => { handleClick() }}>{children}</button>
    )
}


export default Button