import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Chip,
  Divider,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import BookmarkIcon from '@mui/icons-material/Bookmark';

function SavedItineraries({ open, onClose, onLoadItinerary }) {
  const [savedPlans, setSavedPlans] = useState([]);

  useEffect(() => {
    loadSavedPlans();
  }, [open]);

  const loadSavedPlans = () => {
    try {
      const saved = localStorage.getItem('datePlans');
      if (saved) {
        setSavedPlans(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading saved plans:', error);
    }
  };

  const deletePlan = (index) => {
    try {
      const saved = localStorage.getItem('datePlans');
      if (saved) {
        const plans = JSON.parse(saved);
        plans.splice(index, 1);
        localStorage.setItem('datePlans', JSON.stringify(plans));
        setSavedPlans(plans);
      }
    } catch (error) {
      console.error('Error deleting plan:', error);
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-AU', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <BookmarkIcon />
          Saved Date Plans
        </Box>
      </DialogTitle>
      <DialogContent>
        {savedPlans.length === 0 ? (
          <Typography color="text.secondary" align="center" sx={{ py: 4 }}>
            No saved date plans yet. Create one and save it!
          </Typography>
        ) : (
          <List>
            {savedPlans.map((plan, index) => (
              <Box key={index}>
                <ListItem
                  sx={{
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    '&:hover': { bgcolor: 'action.hover' },
                    cursor: 'pointer',
                    borderRadius: 1,
                  }}
                >
                  <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box sx={{ flex: 1 }} onClick={() => onLoadItinerary(plan)}>
                      <ListItemText
                        primary={
                          <Typography variant="h6">
                            {plan.selectedDay} • {plan.selectedLocation.join(', ')}
                          </Typography>
                        }
                        secondary={
                          <Typography variant="caption" color="text.secondary">
                            Saved: {formatDate(plan.timestamp)}
                          </Typography>
                        }
                      />
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1, mb: 1 }}>
                        {plan.selectedVibes.slice(0, 4).map((vibe) => (
                          <Chip key={vibe} label={vibe} size="small" />
                        ))}
                        {plan.selectedVibes.length > 4 && (
                          <Chip label={`+${plan.selectedVibes.length - 4} more`} size="small" />
                        )}
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {plan.datePlan.length} activities
                      </Typography>
                    </Box>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={(e) => {
                        e.stopPropagation();
                        deletePlan(index);
                      }}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </ListItem>
                {index < savedPlans.length - 1 && <Divider />}
              </Box>
            ))}
          </List>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default SavedItineraries;
