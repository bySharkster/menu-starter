
export default function MenuItemLayout({children, modal}: {children: React.ReactNode, modal: React.ReactNode}) {
    return (
        <div>
            {modal && <div>{modal}</div>}
            <div>{children}</div>   
        </div>
    )
}