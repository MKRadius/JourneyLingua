import Profile from "./Profile";
import Exercise from "./Exercise";

const Learn: React.FC<{ locale: 'en' | 'es' | 'pt' }> = ({ locale }) => {
    return (
        <>
            <Profile />
            <Exercise locale={locale} />
        </>
    );
};

export default Learn;
