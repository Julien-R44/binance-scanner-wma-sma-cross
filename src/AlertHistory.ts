import { Alert } from 'Alert'

export class AlertHistory {
  static sentAlerts: Array<Alert> = []

  static addAlert(alert: Alert): void {
    AlertHistory.sentAlerts.push(alert)
  }

  static alertWasAlreadySent(alert: Alert): boolean {
    return !!AlertHistory.sentAlerts.find(
      (sentAlert) =>
        alert.lastCandleTime === sentAlert.lastCandleTime &&
        alert.symbol === sentAlert.symbol &&
        alert.ut === sentAlert.ut &&
        alert.sens === sentAlert.sens
    )
  }
}
