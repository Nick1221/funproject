import {
  Box,
  Typography,
  FormControl,
  FormControlLabel,
  Checkbox,
  FormGroup,
} from '@mui/material';

const locations = [
  'CBD',
  'Inner West',
  'Eastern Suburbs',
  'Lower North Shore',
  'Inner City',
  'Inner South',
  'Harbour',
  'Various',
];

function LocationSelector({ selectedLocation, setSelectedLocation }) {
  const handleLocationToggle = (location) => {
    if (selectedLocation.includes(location)) {
      setSelectedLocation(selectedLocation.filter((loc) => loc !== location));
    } else {
      setSelectedLocation([...selectedLocation, location]);
    }
  };

  const handleSelectAll = () => {
    if (selectedLocation.length === locations.length) {
      setSelectedLocation([]);
    } else {
      setSelectedLocation([...locations]);
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Where do you want to explore? 📍
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Select one or more Sydney regions for your date
      </Typography>
      <FormControl component="fieldset">
        <FormControlLabel
          control={
            <Checkbox
              checked={selectedLocation.length === locations.length}
              indeterminate={selectedLocation.length > 0 && selectedLocation.length < locations.length}
              onChange={handleSelectAll}
            />
          }
          label={<strong>Select All</strong>}
          sx={{ mb: 1 }}
        />
        <FormGroup>
          {locations.map((location) => (
            <FormControlLabel
              key={location}
              control={
                <Checkbox
                  checked={selectedLocation.includes(location)}
                  onChange={() => handleLocationToggle(location)}
                />
              }
              label={location}
            />
          ))}
        </FormGroup>
      </FormControl>
    </Box>
  );
}

export default LocationSelector;
