import React, { useCallback } from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';

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
import { ModalTypeMenu } from './modal/menu';
import { modalAtom } from './store/client-state';

const getButtons = (button: DialogButtonType): DialogButton[] => {
  if (typeof button === 'object') return button;
  switch (button) {
    case 'ok': return [builtinDialogButtonOk];
    case 'yesNo': return [builtinDialogButtonYes, builtinDialogButtonNo];
  }
};

const dialogIconPattern: Record<DialogIcon, string> = {
  error: 'fas fa-circle-xmark text-danger',
  info: 'fas fa-circle-info text-primary',
  question: 'fas fa-circle-question text-primary',
  warning: 'fas fa-circle-exclamation text-warning',
};

const Dialog: React.VFC<{modal: ModalTypeDialog}> = ({modal}) => {
  const buttons = getButtons(modal.buttons ?? 'ok');
	const setModal = useSetAtom(modalAtom);

  const onClickButton = useCallback((i: number) => {
    setModal(null)
    if (modal.onSelect) {
      modal.onSelect(i);
    }
  }, [modal]);

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

const Menu: React.VFC<{modal: ModalTypeMenu}> = ({modal}) => {
	const setModal = useSetAtom(modalAtom);

  return (
    <div className="modal-menu-wrapper menu shadow-2" style={{
      transform: `translate(${modal.screenX}px, ${modal.screenY}px)`
    }}>
      {
        modal.items.map((item, i) => (
          <button className={`item ${item.disabled ? 'disabled' : ''} ${item.danger ? 'text-danger' : ''}`} onClick={() => {
            setModal(null);
            if (item.onClick) {
              item.onClick();
            }
          }} key={i}>
            {item.icon && <i className={item.icon} />}
            {item.name}
          </button>
        ))
      }
    </div>
  );
};

const ModalInner = (modal: Modal) => {
  switch (modal.type) {
    case 'dialog': return <Dialog modal={modal} />;
    case 'menu': return <Menu modal={modal} />;
  }
};

export const ModalComponent: React.VFC = () => {
	const [modal, setModal] = useAtom(modalAtom);
  if (!modal) return null;

  return (
    <div className={`modal fade ${modal.type === 'menu' ? 'top-left' : 'darken'}`} onClick={() => setModal(null)}>
      <div className="fade up" onClick={(e) => e.stopPropagation()}>
        { ModalInner(modal) }
      </div>
    </div>
  );
};
