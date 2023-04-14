import { notifications } from '@mantine/notifications';

export const showInformNotification = (title: string, message: string) =>
  notifications.show({
    title,
    message,
    autoClose: 3000,
    styles: (theme) => ({
      root: {
        minHeight: 88,
        backgroundColor: theme.white,
        borderColor: theme.white,

        '&::before': { backgroundColor: 'var(--green)' },
      },

      title: {
        fontFamily: 'var(--font-roboto)',
        fontWeight: 600,
        fontSize: 28,
        lineHeight: '28px',
        color: 'var(--black)',
      },

      description: {
        fontFamily: 'var(--font-roboto)',
        fontWeight: 500,
        fontSize: 24,
        lineHeight: '24px',
        color: theme.colors.dark[7],
      },

      closeButton: {
        height: 34,
        width: 34,
        color: 'var(--green)',
        '&:hover': { backgroundColor: 'var(--gradient-green2)' },
        svg: {
          height: 34,
          width: 34,
        },
      },
    }),
  });
