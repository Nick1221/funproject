import { Box, Typography, Paper, Chip } from '@mui/material';

function ConfirmationStep({ selectedVibes, selectedLocation, selectedDay }) {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Confirm your preferences ✅
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Review your selections before we create your perfect date plan
      </Typography>

      <Paper variant="outlined" sx={{ p: 3, mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Vibes
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {selectedVibes.map((vibe) => (
            <Chip key={vibe} label={vibe} color="primary" />
          ))}
        </Box>
      </Paper>

      <Paper variant="outlined" sx={{ p: 3, mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Locations
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {selectedLocation.map((location) => (
            <Chip key={location} label={location} color="secondary" />
          ))}
        </Box>
      </Paper>

      <Paper variant="outlined" sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Day
        </Typography>
        <Typography variant="body1">{selectedDay}</Typography>
      </Paper>
    </Box>
  );
}

export default ConfirmationStep;
