import {
  DelegatorNameSet as DelegatorNameSetEvent,
  DelegatorCalled as DelegatorCalledEvent
} from "../generated/templates/Delegator/MemberDelegator"
import {
  Delegator, 
} from "../generated/schema"

export function handleDelegatorNameSet(
  event: DelegatorNameSetEvent
): void {
  let delegator  = Delegator.load(event.params.delegatorId.toString())

  if (delegator != null ) {
    delegator.name = event.params.name
    delegator.save()
  }
  
}

export function handleDelegatorCalled(
  event: DelegatorCalledEvent
): void {
   
  let delegator = Delegator.load(event.params.delegatorId.toString())

  if (delegator != null) {
    delegator.lastCaller = event.params.caller
    delegator.save()
  }

  
}