import { WebView } from 'react-native-webview';
import querystring from 'query-string';
import {
  LinkErrorCode,
  LinkErrorType,
  LinkExitMetadataStatus,
} from '../../../constants/webviewConfig';

const PlaidComponent = ({ token, webviewRef, onEvent, onExit, onSuccess }) => {


  const handleWebViewNavigationStateChange = (event) => {
    if (event.url.startsWith('plaidlink://')) {
      const eventParams = querystring.parse(event.url.replace(/.*\?/, ''));

      const linkSessionId = eventParams.link_session_id;
      const mfaType = eventParams.mfa_type;
      const requestId = eventParams.request_id;
      const viewName = eventParams.view_name;
      const errorCode = eventParams.error_code;
      const errorMessage = eventParams.error_message;
      const errorType = eventParams.error_type;
      const exitStatus = eventParams.exist_status;
      const institutionId = eventParams.institution_id;
      const institutionName = eventParams.institution_name;
      const institutionSearchQuery = eventParams.institution_search_query;
      const timestamp = eventParams.timestamp;

      if (event.url.startsWith('plaidlink://event') && onEvent) {
        onEvent({
          eventName: eventParams.event_name,
          metadata: {
            linkSessionId,
            mfaType,
            requestId,
            viewName,
            errorCode,
            errorMessage,
            errorType,
            exitStatus,
            institutionId,
            institutionName,
            institutionSearchQuery,
            timestamp,
          },
        });
      } else if (event.url.startsWith('plaidlink://exit') && onExit) {
        onExit({
          error: {
            errorCode: LinkErrorCode[errorCode],
            errorMessage: eventParams.error_message,
            errorType: LinkErrorType[errorType],
          },
          metadata: {
            status: LinkExitMetadataStatus[exitStatus],
            institution: {
              id: institutionId,
              name: institutionName,
            },
            linkSessionId,
            requestId,
          },
        });
      } else if (event.url.startsWith('plaidlink://connected') && onSuccess) {
        const publicToken = eventParams.public_token;
        const accounts = JSON.parse(eventParams.accounts);
        onSuccess({
          publicToken,
          metadata: {
            institution: {
              id: institutionId,
              name: institutionName,
            },
            accounts,
            linkSessionId,
          },
        });
      }
      return false;
    }
    return true;
  };


  return (
    <WebView
      source={{
        uri: `https://cdn.plaid.com/link/v2/stable/link.html?isWebview=true&token=${token}`,
      }}
      ref={(ref) => (webviewRef = ref)}
      originWhitelist={['https://*', 'plaidlink://*']}
      onShouldStartLoadWithRequest={handleWebViewNavigationStateChange}
      style={{ flex: 1, height: 500, width: 400, backgroundColor: '#fff', marginBottom:100 }}
      
    />
  );
};

export default PlaidComponent;
