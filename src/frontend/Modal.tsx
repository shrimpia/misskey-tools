import React, { useCallback } from 'react';
import { useSelector } from './store';
import {
	builtinDialogButtonNo,
	builtinDialogButtonOk,
	builtinDialogButtonYes,
	DialogButton,
	DialogButtonType,
	DialogIcon,
	ModalTypeDialog
} from './modal/dialog';
import { Modal } from './modal/modal';
import { useDispatch } from 'react-redux';
import { hideModal } from './store/slices/screen';

const getButtons = (button: DialogButtonType): DialogButton[] => {
	if (typeof button === 'object') return button;
	switch (button) {
		case 'ok': return [builtinDialogButtonOk];
		case 'yesNo': return [builtinDialogButtonYes, builtinDialogButtonNo];
	}
};

const dialogIconPattern: Record<DialogIcon, string> = {
	error: 'bi bi-x-circle-fill text-danger',
	info: 'bi bi-info-circle-fill text-primary',
	question: 'bi bi-question-circle-fill text-primary',
	warning: 'bi bi-exclamation-circle-fill text-warning',
};

const Dialog: React.VFC<{modal: ModalTypeDialog}> = ({modal}) => {
	const buttons = getButtons(modal.buttons ?? 'ok');
	const dispatch = useDispatch();

	const onClickButton = useCallback((i: number) => {
		dispatch(hideModal());
		if (modal.onSelect) {
			modal.onSelect(i);
		}
	}, [dispatch, modal]);

	return (
		<div className="card dialog text-center">
			<div className="body">
				{modal.icon && <div style={{fontSize: '2rem'}} className={dialogIconPattern[modal.icon]} />}
				{modal.title && <h1>{modal.title}</h1>}
				<p>{modal.message}</p>
				<div className="hstack" style={{justifyContent: 'center'}}>
					{
						buttons.map((b, i) => (
							<button className={`btn ${b.style}`} onClick={() => onClickButton(i)} key={i}>
								{b.text}
							</button>
						))
					}
				</div>
			</div>
		</div>
	);
};

const ModalInner = (modal: Modal) => {
	switch (modal.type) {
		case 'dialog': return <Dialog modal={modal} />;
		case 'menu': return <p>Not Implemented</p>;
	}
};

export const ModalComponent: React.VFC = () => {
	const shown = useSelector(state => state.screen.modalShown);
	const modal = useSelector(state => state.screen.modal);
	const dispatch = useDispatch();
	if (!shown || !modal) return null;

	return (
		<div className="modal" onClick={() => dispatch(hideModal())}>
			<div className="fade up" onClick={(e) => e.stopPropagation()}>
				{ ModalInner(modal) }
			</div>
		</div>
	);
};
