import Profile from "./Profile";
import Exercise from "./Exercise";

const Learn: React.FC<{ locale: 'en' | 'es' | 'pt' | 'ua' | 'ru' | 'vn'}> = ({ locale }) => {
    return (
        <>
            <Profile locale={locale} />
            <Exercise locale={locale} />
        </>
    );
};

export default Learn;
