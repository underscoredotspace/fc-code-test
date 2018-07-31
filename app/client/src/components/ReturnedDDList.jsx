import React, { Fragment } from 'react'
import moment from 'moment'

function extractAdvice(item) {
  const ARUDD = item.BACSDocument.Data.ARUDD
  const record = ARUDD.Advice.OriginatingAccountRecords.OriginatingAccountRecord
  return {
    account: record.OriginatingAccount,
    returns: record.ReturnedDebitItem
  }
}

const ReturnedDDList = ({ items }) => {
  if (items.length === 0) return null

  return (
    <div>
      {items.map(item => {
        const advice = extractAdvice(item)
        return (
          <Fragment key={item._id}>
            <h2>{advice.account.name}</h2>
            <table>
              {advice.returns.map(aReturn => (
                <tr>
                  <td>{aReturn.PayerAccount.name}</td>
                  <td>{aReturn.PayerAccount.sortCode}</td>
                  <td>{aReturn.PayerAccount.number}</td>
                  <td>{aReturn.PayerAccount.ref}</td>
                  <td>{aReturn.returnDescription}</td>
                  <td>
                    {aReturn.valueOf[0]} {aReturn.currency}
                  </td>
                </tr>
              ))}
            </table>
            <p>Processed {moment(item.date).calendar()}</p>
          </Fragment>
        )
      })}
    </div>
  )
}

export default ReturnedDDList
