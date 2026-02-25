import styles from './AuthorityBanner.module.css';
import {
    SiOpenai, SiMake, SiZapier, SiAnthropic, SiVercel,
    SiGoogle, SiN8N, SiClickup, SiSlack, SiHubspot,
    SiAsana, SiTrello, SiNotion, SiGooglecloud
} from 'react-icons/si';
import { TbBrandMonday, TbBrandTeams, TbBrandOffice } from 'react-icons/tb';

export default function AuthorityBanner() {
    // Definimos las marcas con sus respectivos logos. 'Kommo' no está nativo en react-icons por lo que usamos texto estilizado.
    const brands = [
        { name: "OpenAI", Icon: SiOpenai },
        { name: "Make", Icon: SiMake },
        { name: "Zapier", Icon: SiZapier },
        { name: "Anthropic", Icon: SiAnthropic },
        { name: "Vercel", Icon: SiVercel },
        { name: "Google", Icon: SiGoogle },
        { name: "n8n", Icon: SiN8N },
        { name: "Kommo", Icon: null },
        { name: "ClickUp", Icon: SiClickup },
        { name: "monday.com", Icon: TbBrandMonday },
        { name: "Slack", Icon: SiSlack },
        { name: "HubSpot", Icon: SiHubspot },
        { name: "Asana", Icon: SiAsana },
        { name: "Trello", Icon: SiTrello },
        { name: "Microsoft Teams", Icon: TbBrandTeams },
        { name: "Microsoft 365", Icon: TbBrandOffice },
        { name: "Notion", Icon: SiNotion },
        { name: "Google Cloud", Icon: SiGooglecloud }
    ];

    const renderBrandRow = (brandsList: typeof brands, keyPrefix: string) => {
        return brandsList.map((brand, idx) => (
            <div key={`${keyPrefix}-${idx}`} className={styles.logoItem}>
                {brand.Icon ? (
                    <>
                        <brand.Icon className={styles.iconSVG} aria-label={brand.name} />
                    </>
                ) : (
                    <span className={styles.textLogo}>{brand.name}</span>
                )}
            </div>
        ));
    };

    return (
        <section className={styles.banner}>
            <p className={styles.text}>Sistemas creados con:</p>
            <div className={styles.carouselContainer}>
                <div className={styles.carouselTrack}>
                    {/* Primera Mitad (50% del ancho del track) */}
                    <div className={styles.trackHalf}>
                        <div className={styles.carouselGroup}>{renderBrandRow(brands, 'h1-1')}</div>
                        <div className={styles.carouselGroup}>{renderBrandRow(brands, 'h1-2')}</div>
                        <div className={styles.carouselGroup}>{renderBrandRow(brands, 'h1-3')}</div>
                        <div className={styles.carouselGroup}>{renderBrandRow(brands, 'h1-4')}</div>
                    </div>
                    {/* Segunda Mitad (50% del ancho del track para loop seamless al llegar a transform: translateX(-50%)) */}
                    <div className={styles.trackHalf}>
                        <div className={styles.carouselGroup}>{renderBrandRow(brands, 'h2-1')}</div>
                        <div className={styles.carouselGroup}>{renderBrandRow(brands, 'h2-2')}</div>
                        <div className={styles.carouselGroup}>{renderBrandRow(brands, 'h2-3')}</div>
                        <div className={styles.carouselGroup}>{renderBrandRow(brands, 'h2-4')}</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
