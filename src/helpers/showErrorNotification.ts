import { notifications } from '@mantine/notifications';

export const showErrorNotification = (title: string, message: string) =>
  notifications.show({
    title,
    message: message === '' ? 'Ошибка при взаимодействии с сервером.' : message,
    autoClose: 50000,
    styles: (theme) => ({
      root: {
        minHeight: 88,
        backgroundColor: theme.white,
        borderColor: theme.white,

        '&::before': { backgroundColor: theme.colors.red[6] },
      },

      title: {
        fontFamily: 'var(--font-roboto)',
        fontWeight: 500,
        fontSize: 28,
        lineHeight: '28px',
        color: theme.colors.red[7],
      },
      description: {
        fontFamily: 'var(--font-roboto)',
        fontWeight: 400,
        fontSize: 24,
        lineHeight: '24px',
        color: theme.colors.red[5],
      },
      closeButton: {
        height: 34,
        width: 34,
        color: theme.colors.red[6],
        '&:hover': { backgroundColor: theme.colors.red[9] },
        svg: {
          height: 34,
          width: 34,
        },
      },
    }),
  });
