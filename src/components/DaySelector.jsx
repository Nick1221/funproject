import {
  Box,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';

function DaySelector({ selectedDay, setSelectedDay }) {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        When's the date? 📅
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Select your preferred day
      </Typography>
      <ToggleButtonGroup
        value={selectedDay}
        exclusive
        onChange={(e, newDay) => {
          if (newDay !== null) {
            setSelectedDay(newDay);
          }
        }}
        fullWidth
        sx={{ mt: 2 }}
      >
        <ToggleButton value="Saturday" sx={{ py: 2, fontSize: '1.1rem' }}>
          Saturday
        </ToggleButton>
        <ToggleButton value="Sunday" sx={{ py: 2, fontSize: '1.1rem' }}>
          Sunday
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}

export default DaySelector;
