/* eslint-disable react-refresh/only-export-components */
import { LoadPage } from '@/components/LoadPage/LoadPage';
import PreviewComponent from '@/components/Pages/create-component/preview/PreviewComponent';
import SensorPermissionEx from '@/components/Examples/SensorPermissionEx/SensorPermissionEx';
import Intro from '@/components/MessageComponent/Intro/Intro';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Prévia da Cartinha Interativa',
  description: 'Visualize a prévia da cartinha de amor interativa criada na LoveVerse.',
  pathname: '/previa/loveverse',
  index: false,
});

export default function Index() {
  return (
    <LoadPage>
      <SensorPermissionEx>
        <Intro>
          <PreviewComponent />
        </Intro>
      </SensorPermissionEx>
    </LoadPage>
  );
}
