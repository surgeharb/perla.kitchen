import Link from '../Link';
import LinksHeader from '../LinksHeader';
import LINKS from '../../data/links';
import Styles from './styles.module.scss';

const LinksContainer = () => (
  <main className={Styles.main}>
    <div
      className={Styles.background}
      style={{ backgroundImage: 'url(/images/internal/cover.jpg)' }}
    />
    <section className={Styles.mainContainer}>
      <LinksHeader />
      <ul className={Styles.list}>
        {LINKS.map(({ name, url, actionText, logoImg, logoWidth }) => (
          <Link {...{ name, url, actionText, logoImg, logoWidth }} />
        ))}
      </ul>
    </section>
  </main>
);

export default LinksContainer;
