import { Toast } from 'native-base';

export const displayErrorMessage =
    (
        message,
        textColor = 'yellow',
        buttonText = 'Okay',
        duration = 2000
    ) => (
            Toast.show({
                text: message,
                textStyle: { color: textColor },
                buttonText,
                duration
            })
        );

