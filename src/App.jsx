import { useState } from 'react';
import {
  Box,
  Container,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Paper,
} from '@mui/material';
import VibeSelector from './components/VibeSelector';
import LocationSelector from './components/LocationSelector';
import DaySelector from './components/DaySelector';
import ConfirmationStep from './components/ConfirmationStep';
import DatePlanResult from './components/DatePlanResult';
import activitiesData from '../jason.json';

const steps = ['Select Vibes', 'Choose Location', 'Pick Day', 'Confirm'];

function App() {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedVibes, setSelectedVibes] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [selectedDay, setSelectedDay] = useState('');
  const [datePlan, setDatePlan] = useState(null);

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      generateDatePlan();
    } else {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setSelectedVibes([]);
    setSelectedLocation([]);
    setSelectedDay('');
    setDatePlan(null);
  };

  const isStepValid = () => {
    switch (activeStep) {
      case 0:
        return selectedVibes.length > 0;
      case 1:
        return selectedLocation.length > 0;
      case 2:
        return selectedDay !== '';
      case 3:
        return true;
      default:
        return false;
    }
  };

  const generateDatePlan = () => {
    // Filter activities based on user preferences
    const filteredActivities = activitiesData.activities.filter(activity => {
      const vibeMatch = selectedVibes.some(vibe => 
        activity.vibes.includes(vibe.toLowerCase())
      );
      const locationMatch = selectedLocation.some(loc => 
        activity.location === loc || activity.location === 'Various'
      );
      const dayMatch = activity.availableDays && 
        activity.availableDays.includes(selectedDay);
      
      return vibeMatch && locationMatch && dayMatch;
    });

    if (filteredActivities.length === 0) {
      setDatePlan([]);
      return;
    }

    // Activity compatibility rules
    const physicalCategories = ['basketball', 'outdoor activities', 'walks'];
    const relaxedCategories = ['cafe', 'markets', 'arcade', 'creative', 'sunset watching'];
    
    // Select 3-5 activities that flow well together
    const plan = [];
    const maxActivities = Math.min(5, filteredActivities.length);
    const minActivities = Math.min(3, filteredActivities.length);
    const numActivities = Math.floor(Math.random() * (maxActivities - minActivities + 1)) + minActivities;
    
    // Start with a random activity
    let firstActivity = filteredActivities[Math.floor(Math.random() * filteredActivities.length)];
    plan.push(firstActivity);
    
    // Remove selected activity from pool
    let remainingActivities = filteredActivities.filter(a => a !== firstActivity);
    
    // Track location changes
    let locationChanges = 0;
    const maxLocationChanges = 2; // Allow up to 2 location changes
    
    for (let i = 1; i < numActivities && remainingActivities.length > 0; i++) {
      const lastActivity = plan[plan.length - 1];
      
      // Find compatible next activities
      const compatibleActivities = remainingActivities.filter(activity => {
        // Don't repeat same category
        if (activity.category === lastActivity.category) return false;
        
        // Avoid multiple high-energy physical activities in a row
        if (physicalCategories.includes(lastActivity.category) && 
            physicalCategories.includes(activity.category)) {
          return false;
        }
        
        // Check location compatibility
        const sameLocation = lastActivity.location === activity.location || 
                           lastActivity.location === 'Various' || 
                           activity.location === 'Various';
        
        if (!sameLocation) {
          // Allow location change if we haven't exceeded the limit
          if (locationChanges >= maxLocationChanges) {
            // Only allow location change for the last activity (sunset watching)
            if (i === numActivities - 1 && activity.category === 'sunset watching') {
              return true;
            }
            return false;
          }
        }
        
        return true;
      });
      
      if (compatibleActivities.length > 0) {
        // Prefer relaxed activities after physical ones
        let nextActivity;
        if (physicalCategories.includes(lastActivity.category)) {
          const relaxedOptions = compatibleActivities.filter(a => 
            relaxedCategories.includes(a.category)
          );
          nextActivity = relaxedOptions.length > 0 
            ? relaxedOptions[Math.floor(Math.random() * relaxedOptions.length)]
            : compatibleActivities[Math.floor(Math.random() * compatibleActivities.length)];
        } else {
          nextActivity = compatibleActivities[Math.floor(Math.random() * compatibleActivities.length)];
        }
        
        // Track location change
        if (lastActivity.location !== 'Various' && 
            nextActivity.location !== 'Various' && 
            lastActivity.location !== nextActivity.location) {
          locationChanges++;
        }
        
        plan.push(nextActivity);
        remainingActivities = remainingActivities.filter(a => a !== nextActivity);
      } else {
        break;
      }
    }
    
    setDatePlan(plan);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <VibeSelector
            selectedVibes={selectedVibes}
            setSelectedVibes={setSelectedVibes}
          />
        );
      case 1:
        return (
          <LocationSelector
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
          />
        );
      case 2:
        return (
          <DaySelector
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
          />
        );
      case 3:
        return (
          <ConfirmationStep
            selectedVibes={selectedVibes}
            selectedLocation={selectedLocation}
            selectedDay={selectedDay}
          />
        );
      default:
        return 'Unknown step';
    }
  };

  if (datePlan !== null) {
    return (
      <DatePlanResult
        datePlan={datePlan}
        selectedVibes={selectedVibes}
        selectedLocation={selectedLocation}
        selectedDay={selectedDay}
        onReset={handleReset}
      />
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
          🎯 Date Day Planner
        </Typography>
        
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ minHeight: 300 }}>
          {getStepContent(activeStep)}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            variant="outlined"
          >
            Back
          </Button>
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={!isStepValid()}
          >
            {activeStep === steps.length - 1 ? 'Generate Date Plan' : 'Next'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default App;
