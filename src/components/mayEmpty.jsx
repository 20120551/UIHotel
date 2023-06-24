export default function MayEmpty({ name, isEmpty, children }) {
    return (
        isEmpty ?
            <>
                <p className="text-center">{name} is empty</p>
            </> :
            children
    )
}