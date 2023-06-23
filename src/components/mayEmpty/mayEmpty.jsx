export default function MayEmpty({ name, isEmpty, children }) {
    return (
        isEmpty ?
            <>
                "{name} is empty"
            </> :
            { children }
    )
}