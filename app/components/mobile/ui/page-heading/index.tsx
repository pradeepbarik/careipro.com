const PageHeading = ({ heading }: { heading: string }) => {
    return (
        <>
            <h1 className='fs-17 font-semibold px-2'>
                {heading}
            </h1>
        </>
    )
}

export default PageHeading