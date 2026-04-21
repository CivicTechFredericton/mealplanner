import Button from '@mui/material/Button';
import { Checkbox, Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { logout, updatePersonTerms } from "../state/state";
import { Navigate, useLocation, useNavigate } from 'react-router';
import { fetchAuthSession } from "aws-amplify/auth";

export const TermsAndConditions = () => {
  const [isAccepted, setIsAccepted] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isTermsPage = location.pathname === '/terms';
  const [hasSession, setHasSession] = useState<boolean | null>(null);

  useEffect(() => {
    fetchAuthSession().then(session => {
      setHasSession(!!session.tokens);
    }).catch(() => {
      setHasSession(false);
    });
  }, []);

  const handleReject = async () => {
    await logout();
    navigate("/");
  };
  const handleCheckboxChange = () => {
    setIsAccepted(!isAccepted);
  };
  const handleAccept = async () => {
    try {
      await updatePersonTerms(true);
      navigate("/mealplans");
    } catch (error) {
      console.error("Failed to update terms acceptance:", error);
    }
  };

  if (isTermsPage && hasSession === null) {
    return null;
  }

  if (isTermsPage && !hasSession) {
    return <Navigate to="/" replace />;
  }

  return (
    <div style={{ margin: "50px", textAlign: "center" }}>
      <Container
        sx={{
          "& h3, h4, h5": { textDecoration: "underline" },
        }}
      >
        <Typography variant="h3" gutterBottom>
          Terms and Conditions
        </Typography>
        <Typography variant="h5" gutterBottom>
          Meals Made Simple
        </Typography>
        <Typography variant="h5" gutterBottom>
          Informed Consent Agreement
        </Typography>
        <Typography variant="h5" gutterBottom align="left">
          Introduction
        </Typography>
        <Typography paragraph align="left">
          Greener Village offers meal planning services to clients free of charge using its Meals
          Made Simple system. The process uses Greener Village staff and volunteers to help clients
          develop meal plans that meet the needs of their families.
        </Typography>
        <Typography paragraph align="left">
          The primary focus of the service is to help clients plan and budget for food. Greener
          Village does not employ medical professionals and does not provide medical diagnostic or
          treatment advice to clients. The organization relies fully upon clients to ensure that the
          meals they select are safe and appropriate for their family to eat given the personal
          health conditions of family members.
        </Typography>
        <Typography paragraph align="left">
          Greener Village also relies fully upon clients to safely prepare and store meals they
          prepare. The organization can help clients access food safe handling information and it
          may periodically offer courses in its Learning Kitchen.
        </Typography>
        <Typography paragraph align="left">
          A secondary focus of the meal planning service is to help clients understand how their
          meal plans compare to recommendations in Canada’s Food Guide. Greener Village does not
          employ dietary or nutritional professionals but it uses such people to provide overall
          ratings of various common meal plans.
        </Typography>
        <Typography paragraph align="left">
          If clients are in need of assistance from trained dietary or nutritional professionals to
          improve the healthiness of their meal plans, Greener Village will help them contact an
          expert or it may sponsor courses to help groups of clients.
        </Typography>
        <Typography paragraph align="left">
          Greener Village plans to work with Food Banks Canada to offer Meals Made Simple to food
          banks across Canada. As part of this national effort, data will be collected to measure
          the effectiveness of the meal planning and budgeting system in helping Canadian families
          reduce food insecurity and enhance healthier eating habits.
        </Typography>
        <Typography paragraph align="left">
          Client confidentiality will be protected at every stage of the implementation of the
          service and the development and use of the database.
        </Typography>
        <Typography variant="h5" gutterBottom align="left">
          Client Consent
        </Typography>
        <Typography paragraph align="left">
          I hereby attest to the following:
        </Typography>
      </Container>

      <Container
        sx={{
          "& p": { paddingLeft: "1rem" },
        }}
      >
        <Typography paragraph align="left">
          1) I fully understand that Greener Village does not offer medical advice or services and
          that I am responsible to ensure that any foods included in any meal plan I select are safe
          for my family to eat.
        </Typography>
        <Typography paragraph align="left">
          2) I fully understand that I am responsible to ensure that safe food handling practices
          are followed in the preparation and storage of meals that are included in any meal plan
          developed for me.
        </Typography>
        <Typography paragraph align="left">
          3) I fully understand that enhancing the healthiness of my meal plans may require access
          to dietary and nutritional professionals, particularly in light of medical conditions of
          members of my family.
        </Typography>
        <Typography paragraph align="left">
          4) I understand that Greener Village will keep all information about me and my family
          confidential, but that they may use non-identifying information for the purpose of
          evaluating and improving the Meals Made Simple program, and that they may share
          non-identifying information with Food Banks Canada.
        </Typography>
        <Typography paragraph align="left">
          5) I understand that this consent form is a release of liability for Greener Village and
          its staff and volunteers. I will not attempt to hold Greener Village, its staff,
          volunteers or any other person involved in the development or delivery of the Meals Made
          Simple program liable for any injury, harm, loss or damage that I or any member of my
          family may suffer as a result of participating in the program.
        </Typography>
        <Typography paragraph align="left">
          6) This statement is being signed voluntarily and that I am not under duress of any kind.
        </Typography>
      </Container>
      <Checkbox onChange={handleCheckboxChange} />
      <span>I agree with the Terms and Conditions</span>
      <div>
        <Button onClick={handleReject}>Reject</Button>
        <Button disabled={!isAccepted} onClick={handleAccept}>
          Accept
        </Button>
      </div>
    </div>
  );
}