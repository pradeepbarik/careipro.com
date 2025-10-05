import { PageData } from '@/lib/hooks/useDpage';
import Header from '@/app/components/mobile/header';
import Form from './form';
const DynamicPage = ({ data, state, city, page_id, page_type }: { data: PageData, state: string, city: string, page_id: number, page_type: string }) => {
    return (
        <>
            <Header heading={data.heading} template="SUBPAGE" />
            {data.sections.map((section, i) =>
                <div key={`section-${i}`}>
                    {section.sectionType === "form" ? <>
                        <Form data={section} state={state} city={city} page_id={page_id} />
                    </> : section.sectionType === "section" ? <>
                    <div dangerouslySetInnerHTML={{__html:section.content}}></div>
                    </> : <>
                    </>}
                </div>
            )}
        </>
    )
}
export default DynamicPage;