import Mission from './Mission';
import Founders from './Founders';

interface AboutUsProps {
  onNavigateToContact?: () => void;
}

const AboutUs = ({ onNavigateToContact }: AboutUsProps = {}) => {
  return (
    <div>
      <Mission onNavigateToContact={onNavigateToContact} />
      <Founders onNavigateToContact={onNavigateToContact} />
    </div>
  );
};

export default AboutUs;
