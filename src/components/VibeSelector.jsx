import { Box, Typography, Chip } from '@mui/material';

const availableVibes = [
  'Playful',
  'Active',
  'Romantic',
  'Chill',
  'Sunny',
  'Rainy',
  'Cozy',
  'Creative',
  'Curious',
  'Adventurous',
  'Scenic',
  'Peaceful',
];

function VibeSelector({ selectedVibes, setSelectedVibes }) {
  const handleVibeToggle = (vibe) => {
    if (selectedVibes.includes(vibe)) {
      setSelectedVibes(selectedVibes.filter((v) => v !== vibe));
    } else {
      setSelectedVibes([...selectedVibes, vibe]);
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        What's the vibe? 😊
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Select one or more vibes that match your ideal date
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {availableVibes.map((vibe) => (
          <Chip
            key={vibe}
            label={vibe}
            onClick={() => handleVibeToggle(vibe)}
            color={selectedVibes.includes(vibe) ? 'primary' : 'default'}
            variant={selectedVibes.includes(vibe) ? 'filled' : 'outlined'}
            sx={{ fontSize: '1rem', py: 2.5 }}
          />
        ))}
      </Box>
    </Box>
  );
}

export default VibeSelector;
