import { useNavigate } from 'react-router-dom';

export const withRouter = (Component) => {
  const Wrapper = (props) => {
    const navigate = useNavigate();
    
    return (
      <Component
        history={navigate}
        {...props}
        />
    );
  };
  
  return Wrapper;
};
