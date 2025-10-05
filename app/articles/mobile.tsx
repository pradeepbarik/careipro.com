import Header from "../components/mobile/header";
const ArticlesMobile = () => {
    return <>
        <Header heading="Articles" template="SUBPAGE" />
        <div>
            <img src="/icon/no-data.svg" />
            <div className="text-center mt-2 font-semibold color-text-light text-lg">
                No articles found for Bhadrak City
            </div>
        </div>
    </>
}
export default ArticlesMobile;