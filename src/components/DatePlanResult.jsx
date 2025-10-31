import {
  Box,
  Container,
  Typography,
  Paper,
  Card,
  CardContent,
  Button,
  Chip,
  Divider,
  Alert,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FavoriteIcon from '@mui/icons-material/Favorite';

function DatePlanResult({ datePlan, selectedVibes, selectedLocation, selectedDay, onReset }) {
  if (datePlan.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Alert severity="warning" sx={{ mb: 3 }}>
            No activities found matching your preferences. Try adjusting your selections!
          </Alert>
          <Button variant="contained" onClick={onReset} fullWidth>
            Start Over
          </Button>
        </Paper>
      </Container>
    );
  }

  const getActivityIcon = (index) => {
    const icons = ['☕', '🎯', '🌅', '🎨', '🏀', '🌳'];
    return icons[index % icons.length];
  };

  const getTimeSlot = (index) => {
    const times = ['Morning', 'Late Morning', 'Lunch', 'Afternoon', 'Late Afternoon', 'Evening'];
    return times[Math.min(index, times.length - 1)];
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Your Perfect Date Day! 💕
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {selectedDay} • {selectedLocation.join(', ')}
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Selected Vibes:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
            {selectedVibes.map((vibe) => (
              <Chip key={vibe} label={vibe} color="primary" size="small" />
            ))}
          </Box>
        </Box>

        <Divider sx={{ mb: 4 }} />

        <Box sx={{ position: 'relative' }}>
          {datePlan.map((activity, index) => (
            <Box key={index} sx={{ mb: 3 }}>
              <Card
                sx={{
                  position: 'relative',
                  '&:hover': {
                    boxShadow: 6,
                  },
                  transition: 'box-shadow 0.3s',
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Typography
                      variant="h4"
                      component="span"
                      sx={{ mr: 2, fontSize: '2rem' }}
                    >
                      {getActivityIcon(index)}
                    </Typography>
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <AccessTimeIcon fontSize="small" color="action" />
                        <Typography variant="caption" color="text.secondary">
                          {getTimeSlot(index)}
                        </Typography>
                      </Box>
                      <Typography variant="h5" component="h3">
                        {activity.name}
                      </Typography>
                    </Box>
                    <Chip
                      label={activity.category}
                      size="small"
                      variant="outlined"
                      sx={{ textTransform: 'capitalize' }}
                    />
                  </Box>

                  <Typography variant="body1" paragraph>
                    {activity.description}
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <LocationOnIcon fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">
                        {activity.location}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                      {activity.vibes.slice(0, 3).map((vibe) => (
                        <Chip
                          key={vibe}
                          label={vibe}
                          size="small"
                          variant="outlined"
                          sx={{ textTransform: 'capitalize' }}
                        />
                      ))}
                    </Box>
                  </Box>
                </CardContent>
              </Card>
              
              {index < datePlan.length - 1 && (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    my: 2,
                  }}
                >
                  <Typography variant="h6" color="primary">
                    ↓
                  </Typography>
                </Box>
              )}
            </Box>
          ))}
        </Box>

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            <FavoriteIcon sx={{ fontSize: 16, verticalAlign: 'middle', mr: 0.5 }} />
            Have an amazing time!
          </Typography>
          <Button variant="outlined" onClick={onReset} fullWidth>
            Plan Another Date
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default DatePlanResult;
