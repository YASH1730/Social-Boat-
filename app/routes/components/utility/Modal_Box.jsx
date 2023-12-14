import { Box, Modal, Tooltip, } from '@shopify/polaris';

// icons 
import youTube from '../../social/icons8-youtube.svg'
import fb from '../../social/icons8-facebook.svg'
import insta from '../../social/icons8-instagram.svg'
import pin from '../../social/icons8-pinterest.svg'
import twitter from '../../social/icons8-twitter.svg'
import whatsapp from '../../social/icons8-whatsapp.svg'
import linkdin from '../../social/icons8-linkedin.svg'
import phone from '../../social/icons8-phone.svg'
import mail from '../../social/icons8-gmail.svg'

export default function ModalBox({ activator, handleChange, active, addRow }) {

    const icons = [{ img: youTube, name: 'YouTube' },
    { img: fb, name: 'Facebook' }, { img: insta, name: 'Instagram' },
     { img: pin, name: "Pinterest" },
     { img: whatsapp, name: "Whatsapp" },
     { img: phone, name: "Phone" },
     { img: mail, name: "Gmail" },
      { img: twitter, name: 'Twitter' }, { img: linkdin, name: "LinkdIn" }]

    return (
        <Modal
            activator={activator}
            open={active}
            onClose={handleChange}
            title="Pick your social icon"
            secondaryActions={[
                {
                    content: 'Cancel',
                    onAction: handleChange,
                },
            ]}
        >
            <Modal.Section>
                <div className='flex' style={{ gap: '10px' }}>
                    {icons.map((icon, i) => <Tooltip key={i} content={icon.name}>
                        <Box as='button' onClick={() => { addRow(icon); handleChange(); }} className='icon-card' ><img src={icon.img} alt="icon" />
                        </Box>
                    </Tooltip>)}
                </div>
            </Modal.Section>
        </Modal>

    );
}