import Styles from './styles.module.scss';

const LinksHeader = () => (
  <>
    <article className={Styles.container}>
      <img src="/images/internal/cover.jpg" width="320" height="180" className={Styles.mainPost} />
      <div className={Styles.avatar}>
        <img src="/images/internal/profile.webp.jpg" width="100" height="100" />
      </div>
      <div className={Styles.overlay} />
    </article>
    <div className={Styles.title}>
      <h3>Welcome to Perla's Kitchen 👩‍🍳</h3>
      <p>Stay tuned for your favorite recipes!</p>
    </div>
  </>
);

export default LinksHeader;
