import { Box, Paper, Typography, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon, color, linkTo = '/', change = null }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Paper
        elevation={3}
        onClick={() => navigate(linkTo)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: 2,
          borderRadius: 3,
          height: '100%',
          cursor: 'pointer',
          transition: 'transform 0.2s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0px 6px 20px rgba(0,0,0,0.1)',
          },
        }}
      >
        <Avatar
          sx={{
            bgcolor: color,
            width: 48,
            height: 48,
            mr: 2,
          }}
        >
          {icon}
        </Avatar>

        <Box>
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 500, color: 'text.secondary' }}
          >
            {title}
          </Typography>

          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            {value}
          </Typography>

          {change && (
            <Typography
              variant="caption"
              sx={{ color: change > 0 ? 'green' : 'red' }}
            >
              {change > 0 ? `▲ +${change}%` : `▼ ${change}%`} from last month
            </Typography>
          )}
        </Box>
      </Paper>
    </motion.div>
  );
};

export default StatCard;
